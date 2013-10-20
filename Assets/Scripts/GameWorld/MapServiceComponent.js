#pragma strict

/// @brief class that used to get a callbacks
public class MapServiceGameEventsListener extends GameEventsListener
{
    public function MapServiceGameEventsListener(mapService: MapServiceComponent)
    {
        mMapServiceComponent = mapService;
    }

    /// @copydoc GameEventsListener.onGamePausedChanged
    public function onGamePausedChanged(paused: boolean)
    {
        mMapServiceComponent.setCanChangeMapState(!paused);
    }

    /// @copydoc GameEventsListener.onGameEvent
    public function onGameEvent(event: GameEvent)
    {
        switch(event.GameEventType)
        {
            case GameEvent.Type.DialogShown:
                mMapServiceComponent.setCanChangeMapState(false);
                break;
            case GameEvent.Type.DialogHidden:
                mMapServiceComponent.setCanChangeMapState(true);
                break;
            default:
                break;
        }
    }

    private var mMapServiceComponent: MapServiceComponent;
}

private var mcMapCameraBehavior: MapCameraBehavior;
private var mcGameDirector: GameDirector;
private var mcGameEventsListener: MapServiceGameEventsListener;

private var mcCanChangeMapState = true;

function Awake()
{
    mcGameEventsListener = new MapServiceGameEventsListener(this);
    mcMapCameraBehavior = gameObject.GetComponent(MapCameraBehavior);
    if (mcMapCameraBehavior == null)
    {
        Debug.LogError("MapServiceComponent: MapCameraBehavior is not found!");
    }
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
            mcGameDirector.addGameListener(mcGameEventsListener);
        }
    }
}

function Update ()
{
    if (mcCanChangeMapState && Input.GetButtonDown("OpenMap"))
    {
        mcMapCameraBehavior.showFullScreen(!mcMapCameraBehavior.mcFullScreen);
    }
}

function setCanChangeMapState(canChange: boolean)
{
    mcCanChangeMapState = canChange;
}