#pragma strict

public var reachableLevelFromCurrentScene: List.<String>;

/**
 * @brief Main (Singleton?) that is be able to process all in-game logic, change
 * what ever need to be changed and inform other services/directors (like MainMenuGameDirector)
 * that current game's state is changed (for example paused/non-paused/etc.).
 */
public class GameDirector
{
    /// Constructor
    function GameDirector()
    {
    }

    /**
     * @brief loads first game's scene.
     */
    function onStartNewGame()
    {
        Application.LoadLevel("Prolog");
    }

    function onDialogFinished(dialog: BaseDialog)
    {
        //TODO: do something
    }
}

private var gameDirector = new GameDirector();

function getGameDirector(): GameDirector
{
    return gameDirector;
}

function Update()
{
}