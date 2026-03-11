type PixPayloadParams = {
  pixKey: string;
  receiverName: string;
  receiverCity: string;
  amount: number;
  description?: string;
  txid?: string;
};

function onlyAsciiUpper(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s\-./]/g, "")
    .toUpperCase()
    .trim();
}

function formatValue(id: string, value: string) {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }

      crc &= 0xffff;
    }
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  pixKey,
  receiverName,
  receiverCity,
  amount,
  description,
  txid,
}: PixPayloadParams) {
  const merchantAccountInfo =
    formatValue("00", "BR.GOV.BCB.PIX") +
    formatValue("01", pixKey) +
    (description ? formatValue("02", description) : "");

  const additionalDataFieldTemplate = formatValue("05", txid || "***");

  const payloadWithoutCrc =
    formatValue("00", "01") +
    formatValue("01", "12") +
    formatValue("26", merchantAccountInfo) +
    formatValue("52", "0000") +
    formatValue("53", "986") +
    formatValue("54", amount.toFixed(2)) +
    formatValue("58", "BR") +
    formatValue("59", onlyAsciiUpper(receiverName)) +
    formatValue("60", onlyAsciiUpper(receiverCity)) +
    formatValue("62", additionalDataFieldTemplate) +
    "6304";

  const finalCrc = crc16(payloadWithoutCrc);

  return payloadWithoutCrc + finalCrc;
}