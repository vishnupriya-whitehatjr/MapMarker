import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerName: "",
      markers: [],
    };
  }

  onRegionChange(region) {
    this.setState({
      region: region,
    });
  }

  render() {
    return (
      <View>
        <MapView
          region={this.state.region}
          onRegionChangeComplete={(region) => {
            this.setState({ region });
          }}
          style={styles.map}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={this.state.markers[index][0]}
              title={this.state.markers[index][1]}
              description=""
            />
          ))}
        </MapView>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <TextInput
            style={styles.textInput}
            value={this.state.markerName}
            placeholder="Marker Name"
            onChangeText={(text) => {
              this.setState({
                markerName: text,
              });
            }}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              var markers = this.state.markers;
              markers.push([
                {
                  latitude: this.state.region.latitude,
                  longitude: this.state.region.longitude,
                },
                this.state.markerName,
              ]);
              this.setState({
                markers: markers,
                markerName: "",
              });
            }}
          >
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.9,
  },

  textInput: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 3.5,

    borderRightWidth: 0,

    width: "80%",
    alignSelf: "center",
    height: Dimensions.get("window").height * 0.1,
    fontSize: 20,
  },

  addButton: {
    backgroundColor: "red",
    alignContent: "center",
    padding: 10,
    display: "flex",

    width: "20%",
    height: 40,
    height: Dimensions.get("window").height * 0.1,

    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 3.5,

    borderLeftWidth: 0,

    justifyContent: "center",
    alignItems: "center",
  },

  addText: {
    fontSize: 26,
  },
});
