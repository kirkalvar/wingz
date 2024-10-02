import { StyleSheet } from "react-native";
import { View, Text, Colors } from "react-native-ui-lib";
import moment from "moment";

import { SVGMapMarker } from "@/assets/svgs";
import { Hr } from "@/components";

type RideRequestInfoProps = {
  status: string;
  pickupTime: string;
  timestamp: string;
  pickupAddress: string | null;
  destinationAddress: string | null;
};

const RideRequestInfo = ({
  status,
  pickupTime,
  timestamp,
  pickupAddress,
  destinationAddress,
}: RideRequestInfoProps): React.JSX.Element => {
  const isPendingStatus = status === "pending";
  const isDeclinedSatus = status === "declined";
  const statusColor = isPendingStatus
    ? Colors.yellow10
    : isDeclinedSatus
    ? Colors.red10
    : Colors.green10;

  return (
    <View>
      <Text text70 marginB-15 style={styles.heading}>
        Ride Request Details
      </Text>

      <View row spread marginB-10>
        <Text grey30>Status:</Text>
        <Text grey20 uppercase style={[styles.value, { color: statusColor }]}>
          {status}
        </Text>
      </View>

      <View row spread marginB-10>
        <Text grey30>Booked Date:</Text>
        <Text grey20 style={styles.value}>
          {moment(timestamp).format("ddd, MMM DD")}
        </Text>
      </View>

      <View row spread>
        <Text grey30>Pick-up Date:</Text>
        <Text grey20 style={styles.value}>
          {moment(pickupTime).format("ddd, MMM DD @ hh:mm a")}
        </Text>
      </View>

      <Hr marginV-20 />

      <View marginB-15>
        <View row centerV marginB-5>
          <SVGMapMarker color={Colors.red10} width={15} height={15} />
          <Text grey30 marginL-5>
            Pick-up Location:
          </Text>
        </View>

        <Text grey20 style={styles.value}>
          {pickupAddress}
        </Text>
      </View>

      <View marginB-15>
        <View row centerV marginB-5>
          <SVGMapMarker color={Colors.grey10} width={15} height={15} />
          <Text grey30 marginL-5>
            Drop-off Location:
          </Text>
        </View>
        <Text grey20 style={styles.value}>
          {destinationAddress}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: "Inter_600SemiBold",
  },
  value: {
    fontFamily: "Inter_500Medium",
  },
});

export default RideRequestInfo;
