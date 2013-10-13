#pragma strict
import System.Collections.Generic;

public var reachableLevelFromCurrentScene: List.<String>;

/// @brief MenuEvent is an event generated for Menu's (like Main Menu).
public class MenuEvent
{}

/// @brief Listener for all menu events like "MainMenu button is pressed, etc."
public class MenuEventsListener
{
    /// @brief triggered when MenuEvent is acquired.
    public function onMenuEvent(event: MenuEvent)
    {}
}

/// @brief Listener for all general game events like gamePausedChanged, etc.
public class GameEventsListener
{
    public class GameEvent
    {}

    public function onGamePausedChanged(paused: boolean)
    {}

    /// @brief triggered when GameEvent is acquired.
    public function onGameEvent(event: GameEvent)
    {}
}

/*----------------------------- GAMEDIRECTOR------------------------------*/
/**
 * @brief Main (Singleton?) that is be able to process all in-game logic, change
 * what ever need to be changed and inform other services/directors (like MainMenuGameDirector)
 * that current game's state is changed (for example paused/non-paused/etc.).
 * All other services that want to receive general game events (like notification that game is paused, etc.)
 * should regester them self
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

    function onMainMenuShown(shown: boolean)
    {
        setPaused(shown);
    }

    /**
     * @brief paused property informs other components whether game logic is paused or not.
     * @return @c true if game logic is paused and @c false otherwise.
     */
    var mPaused: boolean;
    public function get IsPaused(): boolean
    {
        return mPaused;
    }

    private function setPaused(paused: boolean)
    {
        if (mPaused != paused)
        {
            mPaused = paused;
            onGamePaused(mPaused);
        }
    }

    /// GAME EVENTS LISTENERS
    var mGameListeners = new List.<GameEventsListener>();

    /// Adds menu listener to a GameDirector for GameEvent's callbacks
    public function addGameListener(listener: GameEventsListener)
    {
        mGameListeners.Add(listener);
    }

    public function removeGameListener(listener: GameEventsListener)
    {
        mGameListeners.Remove(listener);
    }

    public function onGameEvent(event: GameEventsListener.GameEvent)
    {
        for (var i = 0; i < mGameListeners.Count; i++)
        {
            mGameListeners[i].onGameEvent(event);
        }
    }

    public function onGamePaused(paused: boolean)
    {
        for (var i = 0; i < mGameListeners.Count; i++)
        {
            mGameListeners[i].onGamePausedChanged(paused);
        }
    }

    /// MENU EVENTS LISTENERS
    var mMenuListeners = new List.<MenuEventsListener>();

    /// Adds menu listener to a GameDirector for MenuEvent's callbacks
    public function addMenuListener(listener: MenuEventsListener)
    {
        mMenuListeners.Add(listener);
    }

    public function removeMenuListener(listener: MenuEventsListener)
    {
        mMenuListeners.Remove(listener);
    }

    public function onMenuEvent(event: MenuEvent)
    {
        for (var i = 0; i < mMenuListeners.Count; i++)
        {
            mMenuListeners[i].onMenuEvent(event);
        }
    }
}

private var gameDirector = new GameDirector();

function getGameDirector(): GameDirector
{
    return gameDirector;
}

function Update()
{
    /// Main menu event handling
    if (Input.GetButtonDown("OpenMainMenu"))
    {
        /// Main menu event handling
        var event = new MenuEvent();
        gameDirector.onMenuEvent(event);
    }
}