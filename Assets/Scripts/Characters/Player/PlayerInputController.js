private var motor : CharacterMotor;
private var mcTurnsComponent: TurnsComponent;

function Awake ()
{
    motor = GetComponent(CharacterMotor);
}

function Start()
{
    var turnsServiceObject = GameObject.FindGameObjectWithTag("TurnsService");
    if (turnsServiceObject)
    {
        mcTurnsComponent = turnsServiceObject.GetComponent(TurnsComponent);
        if (!mcTurnsComponent)
        {
            Debug.LogError("CharacterService: TurnsComponent is not found!");
        }
    }
    else
    {
        Debug.LogError("CharacterService: turnsService object is not found.");
    }
}

function Update ()
{
    // if turn-based mode is not enabled then handle input in a 'real' time
    if (!mcTurnsComponent.TurnBasedEnabled)
    {
        motor.inputMoveDirection = getMoveDirection();
        motor.inputJump = Input.GetButton("Jump");
    }
    // otherwise handle input specifically for a turn-based mode if it is a Player's turn
    else if (mcTurnsComponent.PlayersTurn)
    {
        // TODO: implement some nice logic including 'speed points', etc.
        motor.inputMoveDirection = getMoveDirection();
        motor.inputJump = Input.GetButton("Jump");
    }
}

private function getMoveDirection(): Vector3
{
    var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
    if (directionVector != Vector3.zero)
    {
        var directionLength = directionVector.magnitude;
        directionVector = directionVector / directionLength;
        directionLength = Mathf.Min(1, directionLength);
        directionLength = directionLength * directionLength;
        directionVector = directionVector * directionLength;
    }

    var result = transform.rotation * directionVector;
    return result;
}

// Require a character controller to be attached to the same game object
@script RequireComponent (CharacterMotor)
@script AddComponentMenu ("Player/PlayerInputController")
