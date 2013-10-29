﻿#pragma strict

/*------------------------CHARACTERGAMEEVENTSLISTENER-----------------------------------*/
/**
 * @brief Character's GameEvents listener
 */
class CharacterGameEventsListener extends GameEventsListener
{
    public function CharacterGameEventsListener(component: CharacterService, director: GameDirector)
    {
        mComponent = component;
        mGameDirector = director;
    }


    /// @copydoc GameEventsListener.onGamePausedChanged()
    public function onGamePausedChanged(paused: boolean)
    {
        mComponent.updateCharacterMovementComponents(!paused);
    }

    /**
     * @copydoc GameEventsListener.onGameEvent()
     */
    public function onGameEvent(event: GameEvent)
    {
        switch(event.GameEventType)
        {
            case GameEvent.Type.DialogShown:
            case GameEvent.Type.FullScreenUIShown:
                mComponent.updateCharacterMovementComponents(false); //disable character's control
                break;
            case GameEvent.Type.DialogHidden:
            case GameEvent.Type.FullScreenUIHidden:
                mComponent.updateCharacterMovementComponents(true && !mGameDirector.IsPaused); // enable character's control
                break;
            default:
                break;
        }
    }

    private var mComponent: CharacterService;
    private var mGameDirector: GameDirector;
}

/*------------------------CHARACTER TURN EVENTS LISTENER---------------------------------------------------*/

/// @copydoc TurnEventsListener
class CharacterTurnEventsListener extends TurnEventsListener
{
    public function CharacterTurnEventsListener(component: CharacterService, director: GameDirector)
    {
        mComponent = component;
        mGameDirector = director;
    }

    /// @copydoc TurnEventsListener.onTurnBasedChanged()
    public function onTurnBasedChanged(turnBased: boolean)
    {
    }

    /// @copydoc TurnEventsListener.onPlayersTurnChanged()
    public function onPlayersTurnChanged(playersTurn: boolean)
    {
        mComponent.updateCharacterMovementComponents(playersTurn);
    }

    private var mComponent: CharacterService;
    private var mGameDirector: GameDirector;
}


/*------------------------CHARACTER---------------------------------------------------*/
public class Character
{
    public function Character(gameEventsListener: GameEventsListener)
    {
        mGameEventsListener = gameEventsListener;
    }

    public function addTurnEventsListener(eventsListener: CharacterTurnEventsListener)
    {
        if (eventsListener != null)
        {
            mTurnEventsListener = eventsListener;
        }
    }

    private var mGameEventsListener: GameEventsListener;
    private var mTurnEventsListener: CharacterTurnEventsListener;
}


/*------------------------PRIVATE COMPONENT'S MEMBERS-----------------------------------*/
private var mcGameDirector: GameDirector;
private var mcTurnsComponent: TurnsComponent;

private var mcCharacter: Character;




/*--------------------------START, UPDATE, ETC------------------------------------------*/
function Start ()
{
    var mainGameObject = GameObject.FindGameObjectWithTag("GameDirector");
    if (mainGameObject)
    {
        var directorComponent: GameDirectorComponent;
        directorComponent = mainGameObject.GetComponent(GameDirectorComponent);
        mcGameDirector = directorComponent.getGameDirector();
        if (mcGameDirector)
        {
            var gameEventsListener: CharacterGameEventsListener;
            gameEventsListener = new CharacterGameEventsListener(this, mcGameDirector);
            mcGameDirector.addGameListener(gameEventsListener);

            mcCharacter = new Character(gameEventsListener);
        }
    }
    var turnsServiceObject = GameObject.FindGameObjectWithTag("TurnsService");
    if (turnsServiceObject)
    {
        mcTurnsComponent = turnsServiceObject.GetComponent(TurnsComponent);
        if (mcTurnsComponent)
        {
            var turnEventsListener: CharacterTurnEventsListener;
            turnEventsListener = new CharacterTurnEventsListener(this, mcGameDirector);
            mcTurnsComponent.addTurnsListener(turnEventsListener);
            mcCharacter.addTurnEventsListener(turnEventsListener);
        }
        else
        {
            Debug.LogError("CharacterService: TurnsComponent is not found!");
        }
    }
    else
    {
        Debug.LogError("CharacterService: turnsService object is not found.");
    }
}

function updateCharacterMovementComponents(enabled: boolean)
{
    // stop all character movement related components.
    var motorComponents = gameObject.GetComponentsInChildren.<CharacterMotor>(true);
    for (var component: CharacterMotor in motorComponents)
    {
      component.enabled = enabled;
    }
    var inputControllerComponents = gameObject.GetComponentsInChildren.<PlayerInputController>(true);
    for (var component: PlayerInputController in inputControllerComponents)
    {
      component.enabled = enabled;
    }
    var mouseLookComponents = gameObject.GetComponentsInChildren.<MouseLook>(true);
    for (var component: MouseLook in mouseLookComponents)
    {
      component.enabled = enabled;
    }
}

@script AddComponentMenu ("Player/Character Service")