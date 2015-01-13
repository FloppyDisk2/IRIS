using UnityEngine;
using System.Collections;

public class Menu : MonoBehaviour {
	private string username = "";
	private string password = "";
	private string lableText = "";
	private bool isChecking = false;
	void OnGUI() {
		GUI.Box (new Rect (Screen.width / 2 - 250 / 2, 30, 250, 300), "");

		username = GUI.TextField (new Rect (Screen.width / 2 - 100 / 2, 100, 100, 30), username);
		password = GUI.PasswordField (new Rect (Screen.width / 2 - 100 / 2, 150, 100, 30), password, '*');
		if (GUI.Button (new Rect (Screen.width / 2 - 100 / 2, 180, 100, 30), "Log in")) {
			if(!isChecking){
				lableText = "Checking...";
				// Sending login request:
				StartCoroutine(SendData(username, password));
			}

		}

		GUI.Label (new Rect (Screen.width / 2 - 200 / 2, 60, 200, 100), lableText);
		GUI.Label (new Rect (Screen.width / 2 - 100 / 2, 80, 100, 100), "Username:");
		GUI.Label (new Rect (Screen.width / 2 - 100 / 2, 130, 100, 100), "Password:");
	

	}

	private IEnumerator SendData(string username, string password){
		var loginForm = new WWWForm();
		isChecking = true;
		loginForm.AddField("gb", username);
		loginForm.AddField("ww", password);
		WWW www = new WWW (url, loginForm);
		yield return www;
		isChecking = false;
		if (www.text == "Ok") {
			lableText = "You are logged in";
		} else {
			lableText = "Your information isn't correct";
		}
	}

	
	private string url = "http://localhost/theGame/website/connectors/loginEntrance.php";
}
