import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenHeader from "../../Components/ScreenHeader/ScreenHeader";
import { useTranslation } from "react-i18next";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import Input from "../../Components/Input/Input";
import { AuthStackParamList } from "../../Constants/AuthStackParamList";
import Button from "../../Components/Button/Button";
import { useAppDispatch, useAppSelector } from "../../Redux/store/store";
import { COLORS } from "../../Constants/colors";
import { CreateOrUpdateBankDetailsModel } from "../../Models/UserModels";
import { ScrollView } from "react-native-gesture-handler";
import { createOrUpdateBankDetails } from "../../Redux/actions/otherActions";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "BankInfoScreen">;
  route: RouteProp<AuthStackParamList, "BankInfoScreen">;
};

const values: CreateOrUpdateBankDetailsModel = {
  bank_name: "",
  full_name: "",
  bank_branch: "",
  account_number: "",
};

export type FormErrors = {
  bank_name: string;
  full_name: string;
  bank_branch: string;
  account_number: string;
};
const errors: FormErrors = {
  bank_name: "",
  full_name: "",
  bank_branch: "",
  account_number: "",
};

const BankInfoScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();

  const [formValues, setFormValues] =
    useState<CreateOrUpdateBankDetailsModel>(values);
  const [formErrors, setFormErrors] = useState<FormErrors>(values);
  const [generalError, setGeneralError] = useState(false);
  const { isFetchingUser, isLoading, error, success } = useAppSelector(
    (state) => state.global
  );
  const dispatch = useAppDispatch();
    
  const handleFormValues = (value: string, name: string) => {
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: value === "" ? true : false });
  };

  const handleBankInformation = async () => {
    let dataToBeSend = formValues;
    let isSendable = true;

    if (formErrors.bank_name || formValues.bank_name === "") isSendable = false;
    if (formErrors.full_name || formValues.full_name === "") isSendable = false;
    if (formErrors.bank_branch || formValues.bank_branch === "")
      isSendable = false;
    if (formErrors.account_number || formValues.account_number === "")
      isSendable = false;

    if (isSendable) {
      await dispatch(createOrUpdateBankDetails(dataToBeSend));
      navigation.navigate("CreditCardInfoScreen");
    } else {
      setGeneralError(true);
    }
  };

  // useEffect(() => {
  //   console.log("success",success)
  //   console.log("isLoading",isLoading)
  //   if (!isLoading && success) {
  //     navigation.navigate("CreditCardInfoScreen");
  //   }
  // }, [success]);

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScreenHeader
        header={t("bankInfoScreen.bankInfo")}
        showBackButton={true}
        isHeaderBold={true}
        subHeader={t("bankInfoScreen.forPaymentTimeInvested")}
      />
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formBody}>
            <Input
              name="bank_name"
              onTextChanged={handleFormValues}
              label={t("bankInfoScreen.bank")}
              error={generalError}
            />

            <View style={styles.nameArea}>
              <Input
                label={t("bankInfoScreen.accountNumber")}
                name="account_number"
                onTextChanged={handleFormValues}
                size="half"
                keyboardType="number-pad"
                error={generalError}
              />
              <Input
                label={t("bankInfoScreen.branchNumber")}
                name="bank_branch"
                onTextChanged={handleFormValues}
                size="half"
                error={generalError}
              />
            </View>
            <Input
              label={t("bankInfoScreen.fullName")}
              name="full_name"
              onTextChanged={handleFormValues}
              style={styles.inputStyle}
              size="full"
              error={generalError}
            />
          </View>
          <Button
            // onPress={() => navigation.navigate('CreditCardInfoScreen')}
            onPress={() => {
              handleBankInformation();
            }}
            text={t("bankInfoScreen.ok")}
            color={COLORS.purpleLight}
            variant="filled"
            corners="curved"
            buttonStyle={styles.button}
            loading={isFetchingUser || isLoading}
            disabled={isFetchingUser || isLoading}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("CreditCardInfoScreen")}
          >
            <Text style={styles.agreeTerms}>{t("bankInfoScreen.skip")}</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>{t("somethingWentWrong")}</Text>}
        </View>
        <Text style={styles.infoText}>{t("bankInfoScreen.willNeverUse")}</Text>
        <View style={styles.bottomImages}>
          <Image
            style={styles.peopleImage}
            source={require("../../Assets/Images/people3.png")}
          />
          <Image source={require("../../Assets/Images/people_bottom.png")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BankInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },

  form: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderRadius: 10,
    marginTop: 15,
    elevation: 2,
    paddingBottom: 10,
    width: "92%",
    marginBottom: 10,
    alignSelf: "center",
  },
  formHeader: {
    backgroundColor: COLORS.lightPurple,
    paddingVertical: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  profileImage: {
    transform: [{ scale: 1.5 }],
    alignSelf: "center",
  },
  cameraIcon: {
    position: "absolute",
    top: "145%",
    right: "50%",
    transform: [{ scale: 1.2 }],
  },
  formBody: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  nameArea: {
    flexDirection: "row-reverse",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  genderArea: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
  },
  gender: {
    alignSelf: "flex-start",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  inputStyle: {
    marginTop: 15,
  },
  agreeTerms: {
    color: COLORS.blue,
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  checkbox: {
    alignItems: "flex-end",
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    marginTop: 13,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 25,
  },
  infoText: {
    alignSelf: "center",
    marginVertical: 5,
    fontSize: 12,
  },
  bottomImages: {
    alignItems: "center",
    // position: 'absolute',
    // bottom: '3%',
    marginTop: 20,
  },
  peopleImage: {
    marginBottom: -40,
    zIndex: 10,
  },
  error: {
    color: "red",
    alignSelf: "center",
  },
});
