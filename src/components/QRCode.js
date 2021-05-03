import { Box, Center} from "@chakra-ui/react";
import QRCode from "qrcode.react";

import Auth from "../utils/Authentication";

const QRCodePage = () => {
  const user = Auth.getCurrentUser();

  return (
    <Center w="100vw" h="100vh" bg="#F2F5F9">
       <Box bg="white" boxShadow="sm">
        <QRCode size={256} value={user.uid}></QRCode>
       </Box>
    </Center>
  );
}

export default QRCodePage;