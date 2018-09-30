defmodule Memory.Game do
  def new do
    %{
      initLetters: getInitLetters(),
      curLetters: [],
      finLetters: ["C"],
      clicks: 0,
    }
  end

  def browser_val(game) do
    %{
      initLetters: game.initLetters,
      boardMat: getBoardMatrix(game),
      clicks: game.clicks,
    }    
  end

  def getInitLetters() do
    "AABBCCDDEEFFGGHH"
    |> String.graphemes
    |> Enum.shuffle
  end

  def flip(game, idx) do
    initLet = game.initLetters
    cur = game.curLetters

    if (length(cur) == 1) do
      idx1 = idx
      idx2 = Enum.at(cur,0)[:idx]
      
      if idx1 == idx2 do
        Map.put(game, :curLetters, [])
        |> Map.put(:clicks, game.clicks+1)
      else
        val1 = Enum.at(initLet, idx1)
        val2 = Enum.at(initLet, idx2)
        if val1 == val2 do
          Map.put(game, :curLetters, [])
          |> Map.put(:finLetters, game.finLetters++[val1])
          |> Map.put(:clicks, game.clicks+1)
        else
          val = Enum.at(initLet, idx1)
          Map.put(game, :curLetters, cur++[%{idx: idx1, letter: val}])
          |> Map.put(:clicks, game.clicks+1)
        end
      end
    else
      if (length(cur) == 2) do
        :timer.sleep(1000)
        Map.put(game, :curLetters, [])
      else
        val = Enum.at(initLet, idx)
        newList = cur ++ [%{idx: idx, letter: val}]
        Map.put(game, :curLetters, newList)
        |> Map.put(:clicks, game.clicks+1)
      end
    end
  end

  def getBoardMatrix(game) do
    initLet = game.initLetters
    cur = game.curLetters
    finished = game.finLetters
    initMat = initLet
    |> Enum.map(fn(x) ->
      if Enum.member?(finished, x) do
        1
      else
        0
      end
    end)
    
    List.foldr(cur,initMat, fn(x, list) ->
      List.replace_at(list, x[:idx], 1)
    end)
  end
end
