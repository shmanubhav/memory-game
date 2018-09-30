defmodule MemoryWeb.RoomChannel do
  use MemoryWeb, :channel

  alias Memory.Game
  alias Memory.BackupAgent

  def join("room:" <> name, payload, socket) do
    if authorized?(payload) do
      room = BackupAgent.get(name) || Game.new()
      socket = socket
      |> assign(:room, room)
      |> assign(:name, name)
      BackupAgent.put(name, room)
      {:ok, %{"join" => name, "room" => Game.browser_val(room)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("flip", %{"idx" => ll}, socket) do
    name = socket.assigns[:name]
    room = socket.assigns[:room]
    room = Game.flip(socket.assigns[:room], ll)
    socket = assign(socket, :room, room)
    BackupAgent.put(name, room)
    {:reply, {:ok, %{ "room" => Game.browser_val(room)}}, socket}
  end

  def handle_in("checkBoth", %{"idx" => ll}, socket) do
    name = socket.assigns[:name]
    room = socket.assigns[:room]
    if (length(room[:curLetters]) == 2) do
      :timer.sleep(1000)
      room = Game.flip(socket.assigns[:room], ll)
      socket = assign(socket, :room, room)
      BackupAgent.put(name, room)
      {:reply, {:ok, %{ "room" => Game.browser_val(room)}}, socket}
    end
  end

  def handle_in("restart", %{}, socket) do
    name = socket.assigns[:name]
    room = Game.new()
    socket = socket
    |> assign(:room, room)
    |> assign(:name, name)
    BackupAgent.put(name, room)
    {:reply, {:ok, %{ "room" => Game.browser_val(room)}}, socket}
  end

  defp authorized?(_payload) do
    true
  end
end
