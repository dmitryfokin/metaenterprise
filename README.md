# metaenterprise
metarhia library for building enterprise applications

## loadCycleServer



## Applieds objects -

### Master data

### Operations

## default Database structure

### MetaenterpriseAccount

fields:
  * id - type: 'uid'
  * name -  type: 'string', uniqui: true
  * email -  type: 'string'
  * password -  type: 'string'
  * createdAt - type: 'date'
  * updatedAt - type: 'date'

### MetaenterpriseRole

fields:
  * id - type: 'uid'
  * name -  type: 'string', uniqui: true
  * createdAt - type: 'date'
  * updatedAt - type: 'date'

### MetaenterpriseAccountsRole

fields:
  * id - type: 'uid'
  * account -  type: 'Account'
  * role -  type: 'Role'
  * createdAt - type: 'date'
  * updatedAt - type: 'date'

### MetaenterpriseMigrationDB

fields:
  * id - type: 'uid'
  * account -  type: 'Account'
  * data -  type: 'jsonb'
  * createdAt - type: 'date'
  * updatedAt - type: 'date'

### MetaenterpriseModelDB

fields:
  * id - type: 'uid'
  * metadataName -  type: 'string'
  * name -  type: 'string'
  * matadata -  type: 'jsonb'
  * createdAt - type: 'date'
  * updatedAt - type: 'date'

### MetaenterpriseSession

fields:
  * Ref - type: 'uid'
  * accountRef -  type: 'uid'
  * accountTRef -  type: 'uid'
  * name -  type: 'string'
  * matadata -  type: 'jsonb'
  * createdAt - type: 'date'
  * updatedAt - type: 'date'









