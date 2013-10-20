#pragma strict

/*------------------------CHARACTERGAMEEVENTSLISTENER-----------------------------------*/
/**
 * @brief Character's GameEvents listener
 */
class CharacterGameEventsListener extends GameEventsListener
{
    public function CharacterGameEventsListener(componentsObject: GameObject, component: MonoBehaviour, director: GameDirector)
    {
        mGameObject = componentsObject;
        mComponent = component;
        mGameDirector = director;
    }


    /// @copydoc GameEventsListener.onGamePausedChanged()
    public function onGamePausedChanged(paused: boolean)
    {
        updateAllComponentsButThis(!paused);
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
                updateAllComponentsButThis(false); //disable character's control
                break;
            case GameEvent.Type.DialogHidden:
            case GameEvent.Type.FullScreenUIHidden:
                updateAllComponentsButThis(true && !mGameDirector.IsPaused); // enable character's control
                break;
            default:
                break;
        }
    }

    private function updateAllComponentsButThis(enabled: boolean)
    {
        // stop all components.
        var allComponents = mGameObject.GetComponentsInChildren.<MonoBehaviour>(true);
        for (var component: MonoBehaviour in allComponents)
        {
            if (!component.Equals(mComponent))
            {
                component.enabled = enabled;
            }
        }
    }

    private var mGameObject: GameObject;
    private var mComponent: MonoBehaviour;
    private var mGameDirector: GameDirector;
}
/*------------------------CHARACTER---------------------------------------------------*/
public class Character
{
    public function Character(eventsListener: GameEventsListener)
    {
        mGameEventsListener = eventsListener;
    }

    private var mGameEventsListener: GameEventsListener;
}


/*------------------------PRIVATE COMPONENT'S MEMBERS-----------------------------------*/
private var mcGameDirector: GameDirector;

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
            var eventsListener: CharacterGameEventsListener;
            eventsListener = new CharacterGameEventsListener(gameObject, this, mcGameDirector);
            mcGameDirector.addGameListener(eventsListener);

            mcCharacter = new Character(eventsListener);
        }
    }
}

function Update ()
{
}