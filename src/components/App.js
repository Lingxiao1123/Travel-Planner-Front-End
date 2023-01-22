import { Layout, Typography, message, Button } from "antd";
import { useState } from "react";
import { nanoid } from 'nanoid';
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Home from "./Home";
import Myplan from "./Myplan";
import { getPlaceDetails } from "./Map";

import { getCities } from '../utils';
import Footer from "./Footer";

const { Header, Content } = Layout;
const { Title } = Typography;



function App() {
  const [authed, setAuthed] = useState(false);
  const [planList, setPlanList] = useState([]);
  const [planName, setPlanName] = useState("");
  const [isPlanVisible, setPlanVisible] = useState(false);

  const [placeList, setPlaceList] = useState([]);
  const [toMapPlaceList, setToMapPlaceList] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const search = (selected) => {
    // console.log("selected filter", selected);
    //getPlace(selected).then((res))
    if (isPlanVisible) {       
        return ;
    }
    const places = [];
    getCities()
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res[0].poiList.length; i++) {
                // console.log(res[0].poiList[i]);
                if (selected.includes(res[0].poiList[i].category)) {
                    places.push(res[0].poiList[i]);
                }
            }
            // console.log(places);
            setPlaceList(places);
            setToMapPlaceList(places);
        })
        .catch((err) => {
            message.error(err.message);
        })
    }

    const showRoute = async function(curDayPlaces) {
      const newPlaceList = placeList;

      if (curDayPlaces.length > 1) {

          const placeIds = curDayPlaces.map((place) => {
              return place.place_id;
          })
  
          const stopovers = placeIds.slice(1, placeIds.length - 1).map((id) => {
              return { stopover: true, location: { placeId: id } };
          });
          
          const directionsService = new window.google.maps.DirectionsService();
          const results = await directionsService.route({
              origin: { placeId: placeIds[0] },
              destination: { placeId: placeIds[placeIds.length - 1] },
              waypoints: stopovers,
              travelMode: window.google.maps.TravelMode.DRIVING,
              unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          });

          // console.log(results);
          setDirectionsResponse(results);
          setToMapPlaceList([]);
      } else {
          setDirectionsResponse(null);
          setToMapPlaceList(newPlaceList);
      }
    }

  const getPlan = async (plan) => {
    //从myplan接收plan信息，然后通过planList传给home
    //是一个obj，里面有name和route, route是list of list place_id
    setPlanName(plan.name);
    const route = plan.route;
    const newPlanList = [];
    const newPlaceList = [];
    for (let i = 0; i < route.length; i++) {
      const tmp = [];
      for (let j = 0; j < route[i].length; j++) {
        const placeId = route[i][j];
        const newPlace = {
          place_id: placeId
        }

        const result = await getPlaceDetails(newPlace);
        const placeIntro = [];  
        const type = [];
        getCities()
        .then((res) => {
            // console.log(res);
            for (let i = 0; i < res[0].poiList.length; i++) {
                // console.log(res[0].poiList[i]);
                const resPlaceId = res[0].poiList[i].place_id;
                // console.log(resPlaceId);
                if (resPlaceId === placeId) {
                  placeIntro.push(res[0].poiList[i].intro);
                  type.push(res[0].poiList[i].category);
                }
            }
        })
              
        // console.log(result);
        // console.log(result.formatted_address);
        const place = {
          id: nanoid(),
          latitude: result.geometry.location.lat(),
          longitude: result.geometry.location.lng(),
          name: result.name,
          place_id: route[i][j],
          // category: "all",
          category: type,
          address: result.formatted_address,
          intro: placeIntro
        };

        tmp.push(place);
        newPlaceList.push(place);
      }
      newPlanList.push(tmp);
    }
    // console.log(newPlanList);

    setPlanList(newPlanList);
    setPlaceList(newPlaceList);
    setToMapPlaceList(newPlaceList);
    setPlanVisible(true);
  }

  const goBack = () => {
    setPlanVisible(false);
    setPlaceList([]);
    setToMapPlaceList([]);
  }

  const showOneDay = () => {
    const newPlaceList = [
      {
        id: 1,
        latitude: 34.13771386,
        longitude: -118.3599992,
        name: "Sheraton Universal Hotel",
        place_id: "ChIJE_QTQka-woAR90OtzmvxAec",
        category: "hotel",
        address: "333 Universal Hollywood Dr, Universal City, CA 91608",
        intro:"The 20-story Sheraton Universal Hotel is located on the grounds of Universal Studios, with the Universal CityWalk reachable by the hotel's complimentary tram."
      },
      {
        id: 2,
        latitude: 34.136193,
        longitude: -118.3552237,
        name: "Universal Studio",
        place_id: "ChIJzzgyJU--woARcZqceSdQ3dM",
        category: "sight",
        address: "100 Universal City Plaza, Los Angeles 91608",
        intro:"Universal Studios Hollywood is a film studio and theme park in the San Fernando Valley area of Los Angeles County, California. It is one of the oldest and most famous Hollywood film studios still in use."
      },
      {
        id: 3,
        latitude: 34.13632263,
        longitude: -118.3532985,
        name: "Bubba Gump Shrimp Co",
        place_id: "ChIJE6rCL0y-woARmlvB7KcqGsQ",
        category: "restaurant",
        address: "1000 Universal Studios Blvd Suite 114, Universal City, CA 91608",
        intro: "The first Bubba Gump Shrimp Co. restaurant and market opened in 1996 on Cannery Row in Monterey, California."
      },
      {
        id: 4,
        latitude: 34.13432327,
        longitude: -118.3215478,
        name: "Hollywood Sign",
        place_id: "ChIJfVpQRQq_woARQ5hwJsast6s",
        category: "sight",
        address: "Hollywood Sign, Los Angeles, CA 90068",
        intro: "The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood. It was originally created in 1923, the sign was left up and replaced in 1978 with a more durable all-steel structure."
      },
      {
        id: 5,
        latitude: 34.1183426,
        longitude: -118.3004397,
        name: "Griffith",
        place_id: "ChIJywjU6WG_woAR3NrWwrEH_3M",
        category: "sight",
        address: "2800 E. Observatory Rd, Los Angeles 90027",
        intro: "Griffithis a fictional character and the main antagonist of the manga series Berserk by Kentaro Miura. Extraordinarily beautiful, charismatic, and skilled, Griffith is the leader of the mercenary group the Band of the Hawk."
      },
      {
        id: 6,
        latitude: 34.10189211,
        longitude: -118.3266515,
        name: "Hollywood Walk of Fame",
        place_id: "ChIJXyC7WTu_woARPvVMCHBXd4U",
        category: "sight",
        address: "Hollywood Boulevard, Vine St, Los Angeles, CA 90028",
        intro: "The Hollywood Walk of Fame is a historic landmark which consists of more than 2,700 five-pointed terrazzo and brass stars embedded in the sidewalks along 15 blocks of Hollywood Boulevard and three blocks of Vine Street in Hollywood."
      }
    ];

    const newPlanList = [];
    newPlanList.push(newPlaceList);

    setPlanList(newPlanList);
    setPlaceList(newPlaceList);
    setToMapPlaceList(newPlaceList);
    setPlanName("One Day Trip");
    setPlanVisible(true);
  }

  const showThreeDays = () => {
    const newPlanList = [
      [
        {
          id: 1,
          latitude: 34.073620,
          longitude: -118.400352,
          name: "L'Ermitage Beverly Hills",
          place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
          category: "hotel",
          address: "9291 Burton Way, Beverly Hills, CA 90210",
          intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
        },
        {
          id: 2,
          latitude: 34.07362,
          longitude: -118.400352,
          name: "Beverly Hills",
          place_id: "ChIJq0fR1gS8woAR0R4I_XnDx9Y",
          category: "sight",
          address: "455 North Rexford Dr Beverly Hills, CA 90210",
          intro:"Beverly Hills is a city in California's Los Angeles County. Home to many Hollywood stars, it features the upscale shopping street of Rodeo Drive. The expansive Beverly Gardens Park has fountains and rose gardens, plus an illuminated Beverly Hills sign."
        },
        {
          id: 3,
          latitude: 34.0877009,
          longitude: -118.4757863,
          name: "The Getty",
          place_id: "ChIJbzYnQte8woARJaqqFVpKeNo",
          category: "sight",
          address: "1200 Getty Center Dr, Los Angeles 90049",
          intro:"The Getty Center,is a campus of the Getty Museum and other programs of the Getty Trust. The $1.3 billion center opened to the public on December 16, 1997 and is well known for its architecture, gardens, and views overlooking Los Angeles. "
        },
        {
          id: 4,
          latitude: 34.01009,
          longitude: -118.496948,
          name: "Santa Monica State Beach",
          place_id: "ChIJRRBkmSulwoARC9tR7sO6xg0",
          category: "sight",
          address: "Beach in Los Angeles County, California",
          intro:"Located just west of Downtown Los Angeles, Santa Monica beach is a prime example of the famed Southern California beaches. "
        },
        {
          id: 5,
          latitude: 34.13632263,
          longitude: -118.3532985,
          name: "Bubba Gump Shrimp Co.",
          place_id: "ChIJm6deTdekwoARt2dk2c6Dv04",
          category: "restaurant",
          address: "1000 Universal Studios Blvd Suite 114, Universal City, CA 91608",
          intro:"The first Bubba Gump Shrimp Co. restaurant and market opened in 1996 on Cannery Row in Monterey, California."
        },
        {
          id: 6,
          latitude: 34.073620,
          longitude: -118.400352,
          name: "L'Ermitage Beverly Hills",
          place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
          category: "hotel",
          address: "9291 Burton Way, Beverly Hills, CA 90210",
          intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
        }
      ],
      [
        {
          id: 1,
          latitude: 34.073620,
          longitude: -118.400352,
          name: "L'Ermitage Beverly Hills",
          place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
          category: "hotel",
          address: "9291 Burton Way, Beverly Hills, CA 90210",
          intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
        },
        {
          id: 2,
          latitude: 34.136193,
          longitude: -118.3552237,
          name: "Universal Studios Hollywood",
          place_id: "ChIJzzgyJU--woARcZqceSdQ3dM",
          category: "sight",
          address: "100 Universal City Plaza, Los Angeles 91608",
          intro:"Universal Studios Hollywood is a film studio and theme park in the San Fernando Valley area of Los Angeles County, California. It is one of the oldest and most famous Hollywood film studios still in use. "
        },
        {
          id: 3,
          latitude: 34.1183426,
          longitude: -118.3004397,
          name: "Griffith Observatory",
          place_id: "ChIJywjU6WG_woAR3NrWwrEH_3M",
          category: "sight",
          address: "2800 E. Observatory Rd, Los Angeles 90027",
          intro:"Griffithis a fictional character and the main antagonist of the manga series Berserk by Kentaro Miura. Extraordinarily beautiful, charismatic, and skilled, Griffith is the leader of the mercenary group the Band of the Hawk. "
        },
        {
          id: 4,
          latitude: 34.13432327,
          longitude: -118.3215478,
          name: "Hollywood Sign",
          place_id: "ChIJfVpQRQq_woARQ5hwJsast6s",
          category: "sight",
          address: "Hollywood Sign, Los Angeles, CA 90068",
          intro:"The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood. It was originally created in 1923, the sign was left up and replaced in 1978 with a more durable all-steel structure."
        },
        {
          id: 5,
          latitude: 34.1062840731,
          longitude: -118.287757933,
          name: "Alcove Cafe & Bakery",
          place_id: "ChIJDfqmKLDAwoAR7AYkI-Myjqs",
          category: "restaurant",
          address: "1929 Hillhurst Ave, Los Angeles, CA 90027",
          intro:"American food & craft drinks in cozy, historic bungalows with a leafy patio & an upbeat vibe."
        },
        {
          id: 6,
          latitude: 34.073620,
          longitude: -118.400352,
          name: "L'Ermitage Beverly Hills",
          place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
          category: "hotel",
          address: "9291 Burton Way, Beverly Hills, CA 90210",
          intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
        }
      ],
      [
        {
          id: 1,
          latitude: 34.073620,
          longitude: -118.400352,
          name: "L'Ermitage Beverly Hills",
          place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
          category: "hotel",
          address: "9291 Burton Way, Beverly Hills, CA 90210",
          intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
        },
        {
          id: 2,
          latitude: -33.8688,
          longitude: 151.2195,
          name: "Disneyland Park",
          place_id: "ChIJa147K9HX3IAR-lwiGIQv9i4",
          category: "sight",
          address: "1313 Disneyland Dr, Anaheim, CA 92802, USA",
          intro:"Disneyland is a theme park in Anaheim, California. Opened in 1955, it was the first theme park opened by The Walt Disney Company and the only one designed and constructed under the direct supervision of Walt Disney"
        },
        {
          id: 3,
          latitude: -33.8688,
          longitude: 151.2195,
          name: "Blue Bayou Restaurant",
          place_id: "ChIJKzOc7drX3IARh_jEc3p3pCU",
          category: "restaurant",
          address: "1313 S Harbor Blvd, Anaheim, CA 92802, USA",
          intro:"Evocative restaurant by Disneyland's Pirates of the Caribbean ride serving Cajun specialties."
        }
      ]
    ];

    const newPlaceList = [
      {
        id: 1,
        latitude: 34.073620,
        longitude: -118.400352,
        name: "L'Ermitage Beverly Hills",
        place_id: "ChIJXd5IXAC8woAR5IO-2qe6gVA",
        category: "hotel",
        address: "9291 Burton Way, Beverly Hills, CA 90210",
        intro:"L'Ermitage Beverly Hills is the premier independent Five-Star hotel that celebrates luxury through the lens of an elevated residential-style experience."
      },
      {
        id: 2,
        latitude: 34.07362,
        longitude: -118.400352,
        name: "Beverly Hills",
        place_id: "ChIJq0fR1gS8woAR0R4I_XnDx9Y",
        category: "sight",
        address: "455 North Rexford Dr Beverly Hills, CA 90210",
        intro:"Beverly Hills is a city in California's Los Angeles County. Home to many Hollywood stars, it features the upscale shopping street of Rodeo Drive. The expansive Beverly Gardens Park has fountains and rose gardens, plus an illuminated Beverly Hills sign."
      },
      {
        id: 3,
        latitude: 34.0877009,
        longitude: -118.4757863,
        name: "The Getty",
        place_id: "ChIJbzYnQte8woARJaqqFVpKeNo",
        category: "sight",
        address: "1200 Getty Center Dr, Los Angeles 90049",
        intro:"The Getty Center,is a campus of the Getty Museum and other programs of the Getty Trust. The $1.3 billion center opened to the public on December 16, 1997 and is well known for its architecture, gardens, and views overlooking Los Angeles. "
      },
      {
        id: 4,
        latitude: 34.01009,
        longitude: -118.496948,
        name: "Santa Monica State Beach",
        place_id: "ChIJRRBkmSulwoARC9tR7sO6xg0",
        category: "sight",
        address: "Beach in Los Angeles County, California",
        intro:"Located just west of Downtown Los Angeles, Santa Monica beach is a prime example of the famed Southern California beaches. "
      },
      {
        id: 5,
        latitude: 34.13632263,
        longitude: -118.3532985,
        name: "Bubba Gump Shrimp Co.",
        place_id: "ChIJm6deTdekwoARt2dk2c6Dv04",
        category: "restaurant",
        address: "1000 Universal Studios Blvd Suite 114, Universal City, CA 91608",
        intro:"The first Bubba Gump Shrimp Co. restaurant and market opened in 1996 on Cannery Row in Monterey, California."
      },
      {
        id: 6,
        latitude: 34.136193,
        longitude: -118.3552237,
        name: "Universal Studios Hollywood",
        place_id: "ChIJzzgyJU--woARcZqceSdQ3dM",
        category: "sight",
        address: "100 Universal City Plaza, Los Angeles 91608",
        intro:"Universal Studios Hollywood is a film studio and theme park in the San Fernando Valley area of Los Angeles County, California. It is one of the oldest and most famous Hollywood film studios still in use. "
      },
      {
        id: 7,
        latitude: 34.1183426,
        longitude: -118.3004397,
        name: "Griffith Observatory",
        place_id: "ChIJywjU6WG_woAR3NrWwrEH_3M",
        category: "sight",
        address: "2800 E. Observatory Rd, Los Angeles 90027",
        intro:"Griffithis a fictional character and the main antagonist of the manga series Berserk by Kentaro Miura. Extraordinarily beautiful, charismatic, and skilled, Griffith is the leader of the mercenary group the Band of the Hawk. "
      },
      {
        id: 8,
        latitude: 34.13432327,
        longitude: -118.3215478,
        name: "Hollywood Sign",
        place_id: "ChIJfVpQRQq_woARQ5hwJsast6s",
        category: "sight",
        address: "Hollywood Sign, Los Angeles, CA 90068",
        intro:"The Hollywood Sign is an American landmark and cultural icon overlooking Hollywood. It was originally created in 1923, the sign was left up and replaced in 1978 with a more durable all-steel structure."
      },
      {
        id: 9,
        latitude: 34.1062840731,
        longitude: -118.287757933,
        name: "Alcove Cafe & Bakery",
        place_id: "ChIJDfqmKLDAwoAR7AYkI-Myjqs",
        category: "restaurant",
        address: "1929 Hillhurst Ave, Los Angeles, CA 90027",
        intro:"American food & craft drinks in cozy, historic bungalows with a leafy patio & an upbeat vibe."
      },
      {
        id: 10,
        latitude: 33.812511,
        longitude: -117.918976,
        name: "Disneyland Park",
        place_id: "ChIJa147K9HX3IAR-lwiGIQv9i4",
        category: "sight",
        address: "1313 Disneyland Dr, Anaheim, CA 92802, USA",
        intro:"Disneyland is a theme park in Anaheim, California. Opened in 1955, it was the first theme park opened by The Walt Disney Company and the only one designed and constructed under the direct supervision of Walt Disney"
      },
      {
        id: 11,
        latitude: 33.8110028,
        longitude: -117.9212038,
        name: "Blue Bayou Restaurant",
        place_id: "ChIJKzOc7drX3IARh_jEc3p3pCU",
        category: "restaurant",
        address: "1313 S Harbor Blvd, Anaheim, CA 92802, USA",
        intro:"Evocative restaurant by Disneyland's Pirates of the Caribbean ride serving Cajun specialties."
      }    
    ]

    setPlanList(newPlanList);
    setPlaceList(newPlaceList);
    setToMapPlaceList(newPlaceList);
    setPlanName("Tree Days Trip");
    setPlanVisible(true);
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div className="header">
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            <div className="inlineleft">Travel Planner</div>
            <div className="inlineright">{authed ? <Myplan getPlan={getPlan} /> : <SignupForm />}</div>
          </Title>
        </div>
      </Header>
      <Content
        // style={{
        //   padding: "50px",
        //   maxHeight: "calc(100% - 64px)",
        //   overflowY: "auto",
        // }}
          className= "background"
      >
        {authed ? (
          <div className= "afterlogin">
            <Home planList={planList} planName={planName} isPlanVisible={isPlanVisible}
              goBack={goBack} search={search} placeList={placeList} toMapPlaceList={toMapPlaceList}
              showRoute={showRoute} directionsResponse={directionsResponse}
            />
            <div className="recommendation">
             <Button 
                  // style={{marginTop: "10px", marginLeft: "5px" }}
                  key="oneDay"
                  type="primary"
                  onClick={showOneDay}
                  className = "oneDayRecommendationButton"
            > one day feature tour</Button>
            <Button 
                  // style={{marginTop: "10px", marginLeft: "5px" }}
                  key="threeDays"
                  type="primary"
                  onClick={showThreeDays}
                  className= "ThreeDayRecommendationButton"
            > three days feature tour</Button>
            </div>
          </div>
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Content>
      <Footer>
        <div className="footer">
          Footer
        </div>
      </Footer>
    </Layout>
  );
}

export default App;
