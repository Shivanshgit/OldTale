#pragma strict

/**
 * @brief this class contains different types of useful info regarding Player's state (HP, Exp, inventory, etc.).
 * So, basically it is a storage for all kind of useful info about player and player's character.
 */
public class PlayerData
{
    ///@brief constructor
    public function PlayerData()
    {}

    /// @brief Player's health level.
    var mHealth: int;
    public function get Health(): int
    {
        return mHealth;
    }
    public function set Health(value: int)
    {
        if (value >= 0)
        {
            mHealth = value;
        }
        else
        {
            mHealth = 0;
        }
    }

    /// @brief Player's experience.
    var mExperience: int;
    public function get Experience(): int
    {
        return mExperience;
    }
    public function set Experience(value: int)
    {
        if (value >=0 )
        {
            mExperience = value;
        }
        else
        {
            mExperience = 0;
        }
    }

    var mHealthChangedCallback: Function;
    public function set OnHealthChanged(value: Function)
    {
        mHealthChangedCallback = value;
    }
}

/**
 * @brief this class represent different types of player's damage and all necessary info related to this
 * damage.
 */
public class DamageData
{
    enum Type
    {
        Physical
    }

    /// @brief contains Damage's value.
    var mDamage: int;
    public function get Damage(): int
    {
        return mDamage;
    }
    public function set Damage(value: int)
    {
        mDamage = value;
    }
}

public var mcInitializationData: PlayerData;

private var mcData: PlayerData;

/// @brief that's our instance of a Player (it contains player's data, etc.)
static var instance: PlayerComponent;

instance =  FindObjectOfType(PlayerComponent);

function Awake()
{
    if (mcInitializationData != null)
    {
        mcData = mcInitializationData;
    }
    else
    {
        mcData = new PlayerData();
    }
    mcData.OnHealthChanged = this.onPlayersHealthChanged;
}

function OnApplicationQuit() {
    instance = null;
}

/// @return PlayerData object that contains current Player's state.
public function getPlayerData(): PlayerData
{
    return mcData;
}

public function addDamage(damageData: DamageData)
{
    //TODO: process different types of damage here.
    mcData.mHealth -= damageData.Damage;
}

public function onPlayersHealthChanged(health: int)
{
    //TODO: inform GameDirector, etc.
}