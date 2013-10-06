#pragma strict

public class GUIService
{

    /// constructor
    public function GUIService(shown: boolean)
    {
        guiShown = shown;
    }

    /// properties

    /// @c true if GUI element should be shown and false otherwise.
    var guiShown: boolean;

    /// Contains an array of options that are used in a GUI element.
    var guiOptions: Object[]; // TODO: replace Object by a new general class for all GUI elements that have a draw() and etc. methods.

    public function get GUIShown() : boolean
    {
        return guiShown;
    }

    public function set GUIShown( value: boolean)
    {
        guiShown = value;
    }

    public function get GUIOptions() : Object[]
    {
        return guiOptions;
    }

    public function set GUIOptions(value: Object[])
    {
        guiOptions = value;
    }

    public function getGUIOption(index: int): Object
    {
        if (index >= 0 && index < guiOptions.Length )
        {
            return guiOptions[index];
        }
        else
        {
            return null;
        }
    }

    public function getGUIOptionsCount(): int
    {
        return guiOptions ? guiOptions.Length : 0;
    }

}