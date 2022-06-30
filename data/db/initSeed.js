'use strict';

const initScripts = [
  `
    CREATE OR REPLACE FUNCTION "triggerSetTimestamp"()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW."updatedAt" = NOW();
    NEW."recordVersion" = OLD."recordVersion" + 1;
    RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `,
];

const dropScripts = [
  `
  DROP FUNCTION "triggerSetTimestamp";
  `,
];

// const initSeed = [
//   `INSERT INTO public."systemData_Role" (name) VALUES ('developer');`,
//   `INSERT INTO public."systemData_Role" (name) VALUES ('administrator');`,
//   `INSERT INTO public."systemData_Role" (name) VALUES ('user');`,
// ];


// `
  //   CREATE TABLE "systemData_Enterprise" (
  //     "Ref" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  //     "recordVersion" integer NOT NULL DEFAULT 1,
  //     "data" jsonb,
  //     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  //     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW() 
  //   )
  // `,
  // `
  //   CREATE TABLE "systemData_Schemas" (
  //     "Ref" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  //     "recordVersion" integer NOT NULL DEFAULT 1,
  //     "kind" varchar NOT NULL,
  //     "type" varchar NOT NULL,
  //     "hash" varchar NOT NULL,
  //     "data" jsonb,
  //     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  //     "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW() 
  //   )
  // `,
  // `
  //   CREATE OR REPLACE FUNCTION trigger_set_timestamp()
  //   RETURNS TRIGGER AS $$
  //   BEGIN
  //   NEW."updatedAt" = NOW();
  //   NEW."recordVersion" = OLD."recordVersion" + 1;
  //   RETURN NEW;
  //   END;
  //   $$ LANGUAGE plpgsql
  // `,
  // `
  //   CREATE TRIGGER "set_timestamp_systemData_Enterprise"
  //   BEFORE UPDATE ON "systemData_Enterprise"
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE trigger_set_timestamp()
  // `,

// const dropScripts = [
//   `
//   DROP TRIGGER "set_timestamp_systemData_Enterprise" ON "systemData_Enterprise"
//   `,
//   `
//   DROP TABLE "systemData_Enterprise"
//   `,
//   `
//   DROP FUNCTION "trigger_set_timestamp"
//   `,
// ];

module.exports = { 
  initScripts,
  dropScripts, 
}
