import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../Constants/colors";
import Line from "../Line/Line";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type PersonDetailModel = {
  name: string;
  title: string;
  image: string | null;
  location: string;
  birthDate: string;
  price: string;
  gender: string;
  description?: string;
};

type Props = {
  person: PersonDetailModel;
};

const PersonDetail: React.FC<Props> = React.memo(({ person }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Text style={styles.title}>{person.title}</Text>
      <Line />
      <View style={styles.cardBody}>
        <View style={styles.imgAndText}>
          <Text style={styles.redIcon}>*</Text>
          <Text style={styles.price}>{person.price}</Text>
          <View style={styles.iconMain}>
            <Image
              style={{ transform: [{ scale: 1.1 }] }}
              source={require("../../Assets/Images/money.png")}
            />
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.infoBox}>
            <View style={styles.textMain}>
              <Text style={styles.valuesText}>{person.name}</Text>
              <Text style={styles.titleText}>
              {`${person.gender} :${t(
                "gender"
              )}`}
              </Text>
            </View>
            <View style={styles.textMain}>
              <View style={styles.iconMain}>
                <Image
                  style={{ transform: [{ scale: 1.1 }] }}
                  source={require("../../Assets/Images/location.png")}
                />
              </View>
              <Text style={styles.valuesText}>{person.location}</Text>
            </View>
            <View style={styles.textMain}>
              <View style={styles.iconMain}>
                <Image
                  style={{ transform: [{ scale: 1.1 }] }}
                  source={require("../../Assets/Images/calendar.png")}
                />
              </View>
              <Text style={styles.valuesText}>{person.birthDate}</Text>
            </View>
          </View>
          <View style={styles.imageMain}>
            {person.image ? (
              <Image source={{ uri: person.image }} style={styles.image} />
            ) : (
              <Image
                source={require("../../Assets/Images/no_image.png")}
                style={styles.image}
              />
            )}
          </View>
        </View>
      </View>
      <Line style={[{ marginVertical: 10 }]} />

      <View style={styles.desMain}>
        <View style={styles.desTitleMain}>
          <Text style={styles.title}>{t("details")}</Text>
        </View>
        <Text style={styles.valuesText}>{person.description}</Text>
      </View>

      <Line style={[{ marginVertical: 10 }]} />
    </>
  );
});

export default PersonDetail;

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS.purpleLight,
    marginVertical: 10,
  },
  title: {
    alignSelf: "flex-start",
    fontWeight: "700",
    paddingHorizontal: 5,
    fontSize: 18,
    marginBottom: 5,
  },
  cardBody: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
  },
  redIcon: {
    color: COLORS.error,
    fontSize: 18,
    marginTop: 6,
    marginLeft: 5,
  },
  valuesText: {
    marginLeft: 5,
    color: COLORS.text,
    textAlign: "left",
  },
  titleText: {
    marginLeft: 5,
    color: COLORS.subText,
    flexWrap: "wrap",
  },
  iconMain: {
    height: 23,
    width: 23,
    borderRadius: 12.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightPurple,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  infoBox: {
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 5,
    flexWrap: "wrap",
    //justifyContent: 'space-between',
  },
  imgAndText: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  textMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 7,
    paddingRight: 3,
    flexWrap: "nowrap",
  },
  rightSection: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  imageMain: {
    height: 100,
    width: 80,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  desMain: {
    paddingVertical: 8,
  },
  desTitleMain: {
    paddingBottom: 5,
  },
  price: {},
});
