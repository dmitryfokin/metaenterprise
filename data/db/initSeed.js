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

const func = [

  `
  CREATE OR REPLACE FUNCTION test7(data json) 
  --  RETURNS jsonb AS
    RETURNS table (ref uuid, "rewNumber" integer) AS
    $$
    DECLARE
      --new_rec "systemData_Account";
    rec RECORD;
    rec2 RECORD;
    BEGIN
    --INSERT INTO "systemData_Account" ("dataPassword","login","password") VALUES (data->'head'->'dataPassword',data->'head'->'login',data->'head'->'password') RETURNING * INTO new_rec;
  
    --FOR i IN 0..(JSON_ARRAY_LENGTH(data->'subTables'->'userRoles'->'Role')-1) LOOP
    --  INSERT INTO "systemData_Account_userRoles" ("ref","recordVersion","Role") VALUES (new_rec.ref,i,(data->'subTables'->'userRoles'->'Role'->0)::uuid);
    --END LOOP;
  
    create type uuid_array as (ref uuid[], "rowNumber" integer[]);
    SELECT * INTO rec FROM json_populate_record(null::uuid_array, '{"ref":["23904b9a-6dad-4b0e-ba1a-e39beb03b54a","b0d0d393-c244-44b0-a976-5270199652e3"], "rowNumber":[1,2]}');
    drop type uuid_array;
    
    --INSERT INTO "systemData_Account_userRoles" ("ref","Role") SELECT 'b08ffc74-5b1e-475a-812c-a5327ba312bd', "ref" AS "Role" FROM unnest(rec.ref, rec."rowNumber");
    RETURN QUERY SELECT * FROM unnest(rec.ref, rec."rowNumber");
    --return to_jsonb(rec2);
    END;
    $$ LANGUAGE plpgsql;
    
  SELECT test7('{"head": {"dataPassword":"{\"a\":1}","login":"marcus","password":"123"},"subTables":{"userRoles":{"Role":["22faea2c-0925-4b0e-a588-75974ada12bb","430763ed-d198-4273-bf17-6946047cc3b2"]}}}');
  
  --drop FUNCTION test7;  
  `,



  `
  CREATE OR REPLACE FUNCTION test6(data jsonb) 
  RETURNS jsonb AS
  $$
  DECLARE
    new_rec "systemData_Account";
  BEGIN
  INSERT INTO "systemData_Account" ("dataPassword","login","password") VALUES (data->'head'->'dataPassword',data->'head'->'login',data->'head'->'password') RETURNING * INTO new_rec;

  FOR i IN 0..(JSONB_ARRAY_LENGTH(data->'subTables'->'userRoles'->'Role')-1) LOOP
    INSERT INTO "systemData_Account_userRoles" ("ref","recordVersion","Role") VALUES (new_rec.ref,i,data->'subTables'->'userRoles'->'Role'->i);
  END LOOP;


  return to_jsonb(new_rec);
  END;
  $$ LANGUAGE plpgsql;  
  `,
  `
  SELECT test5('{"head": {"dataPassword":"{\"a\":1}","login":"marcus","password":"123"},"subTables":{"userRoles":{"Role":['22faea2c-0925-4b0e-a588-75974ada12bb','430763ed-d198-4273-bf17-6946047cc3b2']}}}');
  `,
  `
  select * from json_populate_record(null::uuid, '['22faea2c-0925-4b0e-a588-75974ada12bb','430763ed-d198-4273-bf17-6946047cc3b2']');
  `,


  `
  CREATE OR REPLACE FUNCTION test2(data jsonb) 
  RETURNS "systemData_Role" AS
  $$
  DECLARE
    new_rec "systemData_Role";
  BEGIN
    INSERT INTO "systemData_Role" ("name") VALUES (data->'head'->'name') RETURNING * INTO new_rec;
    return new_rec;
  END;
  $$ LANGUAGE plpgsql;
  `,
  `
  SELECT test2('{"head": {"name":"Director"}}');
  `,




  `
  CREATE OR REPLACE FUNCTION test4(data jsonb) 
  RETURNS jsonb AS
  $$
  DECLARE
    new_rec "systemData_Role";
  BEGIN
    INSERT INTO "systemData_Role" ("name") VALUES (data->'head'->'name') RETURNING * INTO new_rec;
    return to_jsonb(new_rec);
  END;
  $$ LANGUAGE plpgsql;  
  `,

  `
  SELECT test4('{"head": {"name":"Director4"}}');
  `,

  `
  "{""ref"":""430763ed-d198-4273-bf17-6946047cc3b2"",""recordVersion"":1,""name"":""\""Director1\"""",""createdAt"":""2022-07-07T08:46:13.857036+03:00"",""updatedAt"":""2022-07-07T08:46:13.857036+03:00""}"
  `,



  `
  CREATE OR REPLACE FUNCTION  new_bolshek(parent_id bigint, _key text, _value text, enabled boolean)
  RETURNS SETOF bolshekter AS
  $BODY$
  DECLARE
    new_id integer;
    returnrec bolshekter;
  BEGIN
        INSERT INTO bolshekter(parent_id, content_key, content_value, enabled)
        VALUES(parent_id, _key, _value, enabled) RETURNING id INTO new_id;
        FOR returnrec IN SELECT * FROM bolshekter where id=new_id LOOP
            RETURN NEXT returnrec;
        END LOOP;
  END;
  $BODY$
  LANGUAGE 'plpgsql' VOLATILE
  COST 100;  `,

  `
  CREATE OR REPLACE FUNCTION test1(data jsonb) 
  RETURNS table (j json) AS
  $$
  BEGIN
  IF pcola = 1 
  THEN
      RETURN QUERY  SELECT row_to_json(a) FROM (SELECT cola, colb FROM tbl_jtest) a;
  ELSE
      RETURN QUERY  SELECT to_json(a) FROM (SELECT colb, colc FROM tbl_jtest) a;
  END IF;
  END;
  $$ LANGUAGE plpgsql;  
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
