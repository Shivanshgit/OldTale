#pragma strict

var mcTurnBasedEnabled: boolean = false;
var mcPlayersTurn = true;

/// TurnEventsListener class is an interface for every object that want to be informed regarding turns updates (who's turn is it, etc).
public class TurnEventsListener
{
    /**
     * callback that is caleed when game is changing its state between turn-based and non-turnbased modes.
     * @param turnBased true if turn-base mode is enabled and false otherwise.
     */
    function onTurnBasedChanged(turnBased: boolean)
    {}

    /**
     * this callback is called when players or mobs turn is over.
     */
    function onPlayersTurnChanged(playersTurn: boolean)
    {}
}

/// holds all attached to this component turns listeners.
private var mcTurnListeners = new List.<TurnEventsListener>();

function addTurnsListener(listener: TurnEventsListener)
{
    if (listener != null)
    {
        mcTurnListeners.Add(listener);
    }
}

function removeListener(listener: TurnEventsListener)
{
    mcTurnListeners.Remove(listener);
}


/// should be called by mobs when player is considered as 'detected' to turn on a turn-based mode.
function playerDetected()
{
    mcTurnBasedEnabled = true;
    mcPlayersTurn = true;
    notifyTurnBasedChanged();
}

/// notifies listeners that turn-based mode is changed.
function notifyTurnBasedChanged()
{
    for (var i = 0; i < mcTurnListeners.Count; i++)
    {
        (mcTurnListeners[i]).onTurnBasedChanged(mcTurnBasedEnabled);
    }
}

function notifyPlayersTurnChanged()
{
    for (var i = 0; i < mcTurnListeners.Count; i++)
    {
        (mcTurnListeners[i]).onTurnBasedChanged(mcTurnBasedEnabled);
    }
}