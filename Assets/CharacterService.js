#pragma strict

class CharacterGameEventsListener extends GameEventsListener
{
    public function CharacterGameEventsListener(componentsObject: GameObject, component: MonoBehaviour)
    {
        mGameObject = componentsObject;
        mComponent = component;
    }


    /// @copydoc GameEventsListener.onGamePausedChanged()
    public function onGamePausedChanged(paused: boolean)
    {
        // stop all components.
        var allComponents = mGameObject.GetComponentsInChildren.<MonoBehaviour>(true);
        for (var component: MonoBehaviour in allComponents)
        {
            if (component != mComponent)
            {
                component.enabled = !paused;
            }
        }
    }

    private var mGameObject: GameObject;
    private var mComponent: MonoBehaviour;
}

private var mcGameDirector: GameDirector;

private var eventsListener: CharacterGameEventsListener;

function Awake()
{
    eventsListener = new CharacterGameEventsListener(gameObject, this);
}

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
            mcGameDirector.addGameListener(eventsListener);
        }
    }
}

function Update ()
{

}