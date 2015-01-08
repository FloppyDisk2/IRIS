using UnityEngine;
using System.Collections;

public class Shoot : MonoBehaviour {
	public Transform Gun;
	public int rayDist = 1;
	public float rayDuration = 1.0f;
	
	public GameObject awesomePrefab;
	
	// Use this for initialization
	void Update () {
		if (Input.GetMouseButtonDown(0)) {
		//	Debug.Log("PANG");
			RaycastHit hit;
			Debug.DrawRay(Gun.position, Gun.forward*rayDist, Color.red, rayDuration, false);
			
			if (Physics.Raycast(Gun.position, Gun.forward, out hit)){
		//		Debug.Log(hit.transform);
				Instantiate(awesomePrefab,hit.point, Quaternion.identity);
				
				//			float distanceToGround = hit.distance;
			}
		}
	}
	
}
