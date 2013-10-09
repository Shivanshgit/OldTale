#pragma strict
import System.Collections.Generic;

public class GUIService
{

    /// constructor
    public function GUIService(shown: boolean)
    {
        m_guiShown = shown;
    }

    /// properties

    /// @c true if GUI element should be shown and false otherwise.
    var m_guiShown: boolean;
    public function get GUIShown() : boolean
    {
        return m_guiShown;
    }
    public function set GUIShown( value: boolean)
    {
        m_guiShown = value;
    }

    /// Contains an array of options that are used in a GUI element.
    var m_guiOptions = new List.<GUIObject>();
    public function get GUIOptions() : List.<GUIObject>
    {
        return m_guiOptions;
    }

    public function getGUIOptionsCount(): int
    {
        return m_guiOptions.Count;
    }

    public function draw()
    {
        if (m_guiShown)
        {
            for (var i: int = 0; i < m_guiOptions.Count; i++)
            {
                m_guiOptions[i].drawObject();
            }
        }
    }

}