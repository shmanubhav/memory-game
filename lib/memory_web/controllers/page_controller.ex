defmodule MemoryWeb.PageController do
  use MemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def room(conn, params) do
    room = params["room"]
    render conn, "room.html", room: room
  end
end
