import { FieldHook } from "payload/types";
import { setBotEnabled } from "../discord/bot";

const ToggleBotEnabled: FieldHook = (args) => {
    setBotEnabled(args.value)
}

export default ToggleBotEnabled;