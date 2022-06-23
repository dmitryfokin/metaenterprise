CREATE TABLE 'Account' (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL
);

CREATE TABLE session (
    ref uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
    data jsonb
);

DROP TABLE session;

INSERT INTO session (ref, data) VALUES ('bebdfd48-61b6-434c-ae05-688f65cf304b', '{}');
select * from session;

UPDATE session SET data = '{"ref":"bebdfd48-61b6-434c-ae05-688f65cf304b", "leyoutApplicaton": {} }' 
  WHERE ref = 'bebdfd48-61b6-434c-ae05-688f65cf304b';

        "editor.background": "#B5FFC8",
        "editor.foreground": "#0000FF",
        "editor.lineHighlightBackground": "#C1EED5",
        "tex": "#C1EED5",

                "scope": [
                    "string.json.comments",
                    "support.type.property-name.json.comments",
                    "string.quoted.double.json.comments",
                    "meta.structure.dictionary.value.json.comments",
                    "meta.structure.dictionary.json.comments",
                    "meta.structure.array.json.comments",
                    "meta.structure.dictionary.value.json.comments",
                    "meta.structure.dictionary.json.comments",
                    "meta.structure.dictionary.value.json.comments",
                    "meta.structure.dictionary.json.comments"
                ],

