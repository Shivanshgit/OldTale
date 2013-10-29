#pragma strict

/// @brief holds a ref on a Player's GameObject.
public var mcPlayer: GameObject;
public var mcDetectPlayerOnDistance: float = 50.0f;

/// @brief
public var mcTurnsService: GameObject;

private var mcPlayerTransform: Transform;
private var mcPlayerWithinVisibleDistance: boolean = false;

private var mcTurnsComponent: TurnsComponent;

function Start ()
{
  if (mcPlayer == null)
  {
    mcPlayer = GameObject.FindGameObjectWithTag("Player");
  }
  if (mcPlayer)
  {
    mcPlayerTransform = mcPlayer.transform;
  }
  else
  {
    Debug.LogError("MobsBehavior,Start(): Player's GameObject not found");
  }

  if (mcTurnsService == null)
  {
    mcTurnsService = GameObject.FindGameObjectWithTag("TurnsService");
  }
  if (mcTurnsService != null)
  {
    mcTurnsComponent = mcTurnsService.GetComponent(TurnsComponent);
  }
  else
  {
    Debug.LogError("MobsBehavior,Start(): TurnsService's GameObject not found");
  }
  var vectorBetweenObjects = mcPlayerTransform.position - transform.position;
  setPlayerWithinVisibleDistance(vectorBetweenObjects.sqrMagnitude < mcDetectPlayerOnDistance);
}

function Update ()
{
  var vectorBetweenObjects = mcPlayerTransform.position - transform.position;
  setPlayerWithinVisibleDistance(vectorBetweenObjects.sqrMagnitude < mcDetectPlayerOnDistance * mcDetectPlayerOnDistance);
}

/// @brief sets new player visible within distance value and notifies turns service about it.
private function setPlayerWithinVisibleDistance(newValue: boolean)
{
  if (mcPlayerWithinVisibleDistance != newValue)
  {
    mcPlayerWithinVisibleDistance = newValue;
    mcTurnsComponent.playerDetected(mcPlayerWithinVisibleDistance);
  }
}

@script AddComponentMenu ("Mobs/Mobs Behavior")
