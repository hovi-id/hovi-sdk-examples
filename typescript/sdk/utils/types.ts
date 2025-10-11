import {
  CheqdEcosystem,
  IndicioEcosystem,
  OpenIdEcosystem,
  PrivadoEcosystem,
} from "@hovi/core-sdk";
import {
  CreateCredentialTemplateAnoncredsRequest,
  CreateCredentialTemplateJsonldRequest,
  CreateCredentialTemplateMdocRequest,
  CreateCredentialTemplateSdJwtRequest,
  CreateVerificationTemplateAnoncreds,
  CreateVerificationTemplateJsonldRequest,
  CreateVerificationTemplateMdocRequest,
  CreateVerificationTemplateSdJwtRequest,
  OfferCredentialAnoncredsRequest,
  OfferCredentialJsonldRequest,
  OfferCredentialMdocRequest,
  OfferCredentialSdJwtRequest,
  SendProofRequest,
} from "@hovi/core-sdk/dist/src/ecosystems/types";

export type TEcosystem = "OpenID" | "Privado" | "Indicio" | "Cheqd";

export type TCredentialFormat = "Json-LD" | "SD-JWT" | "Mdoc" | "Anoncreds";

export type TCredentialTemplatePayload =
  | CreateCredentialTemplateJsonldRequest
  | CreateCredentialTemplateAnoncredsRequest
  | CreateCredentialTemplateMdocRequest
  | CreateCredentialTemplateSdJwtRequest;

export type TVerificationTemplatePayload =
  | CreateVerificationTemplateMdocRequest
  | CreateVerificationTemplateSdJwtRequest
  | CreateVerificationTemplateJsonldRequest
  | CreateVerificationTemplateAnoncreds;

export type TOfferCredentialPayload =
  | OfferCredentialMdocRequest
  | OfferCredentialAnoncredsRequest
  | OfferCredentialSdJwtRequest
  | OfferCredentialJsonldRequest;

export type TSendProofPayload = SendProofRequest;

export type EcosystemClient =
  | OpenIdEcosystem
  | PrivadoEcosystem
  | IndicioEcosystem
  | CheqdEcosystem;
