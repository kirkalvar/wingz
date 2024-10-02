import View from "react-native-ui-lib/view";
import Text from "react-native-ui-lib/text";

type ErrorMessageProp = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProp): React.JSX.Element => {
  return (
    <View absT>
      <Text>{message}</Text>
    </View>
  );
};

export default ErrorMessage;
