import {
  OpenIdEcosystem,
  PrivadoEcosystem,
  IndicioEcosystem,
  CheqdEcosystem,
} from "@hovi/core-sdk";
import { TEcosystem } from "./types";

export const ecosystemMap: Record<string, any> = {
  OpenID: OpenIdEcosystem,
  Privado: PrivadoEcosystem,
  Indicio: IndicioEcosystem,
  Cheqd: CheqdEcosystem,
};
export const isInstanceOfEcosystem = (
  ecosystemName: TEcosystem,
  client: any
) => {
  const ClassRef = ecosystemMap[ecosystemName];
  return ClassRef ? client instanceof ClassRef : false;
};

// import {
//   CheqdEcosystem,
//   IndicioEcosystem,
//   OpenIdEcosystem,
//   PrivadoEcosystem,
// } from "@hovi/core-sdk";
// import {
//   TCredentialFormat,
//   TCredentialTemplatePayload,
//   TEcosystem,
// } from "./types";

// export const ecosystemPicker = async (
//   ecosystemName: TEcosystem,
//   payload: TCredentialTemplatePayload,
//   credentialType: TCredentialFormat,
//   client: OpenIdEcosystem | PrivadoEcosystem | IndicioEcosystem | CheqdEcosystem
// ) => {
//   const ecosystemMap: Record<string, any> = {
//     OpenID: OpenIdEcosystem,
//     Privado: PrivadoEcosystem,
//     Indicio: IndicioEcosystem,
//     Cheqd: CheqdEcosystem,
//   };
//   let result;
//   const isInstanceOfEcosystem = (ecosystemName: TEcosystem) => {
//     const ClassRef = ecosystemMap[ecosystemName];
//     return ClassRef ? client instanceof ClassRef : false;
//   };

//   if (credentialType && payload) {
//     if (credentialType === "Json-LD" && isInstanceOfEcosystem(ecosystemName)) {
//       result = await client.createCredentialTemplateJsonld(
//         payload as CreateCredentialTemplateJsonldRequest
//       );
//     }
//     if (credentialType === "SD-JWT" && client instanceof OpenIdEcosystem) {
//       result = await client.createCredentialTemplateSdJwt(
//         payload as CreateCredentialTemplateSdJwtRequest
//       );
//     }
//     if (credentialType === "Mdoc" && client instanceof OpenIdEcosystem) {
//       result = await client.createCredentialTemplateMdoc(
//         payload as CreateCredentialTemplateMdocRequest
//       );
//     }
//     if (credentialType === "Anoncreds") {
//       if (client instanceof IndicioEcosystem) {
//         result = await client.createCredentialTemplateAnoncreds(
//           payload as CreateCredentialTemplateAnoncredsRequest
//         );
//       }
//       if (client instanceof CheqdEcosystem) {
//         result = await client.createCredentialTemplateAnoncreds(
//           payload as CreateCredentialTemplateAnoncredsRequest
//         );
//       }
//     }
//   } else {
//     result = await client.createCredentialTemplateJsonld(
//       defaultPayload as CreateCredentialTemplateJsonldRequest
//     );
//   }
// };
