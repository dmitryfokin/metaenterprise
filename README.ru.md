# metaenterprise
metarhia библиотека для создания enterprise приложений

## Последовательность загрузки сервера

### Инициализация Metarhia

### Загрузка метаданных приложения

### Инициализация БД

  * Подключаемся к БД
  * Проверяем предопределенные таблицы
  * Проверяем данные из таблицы MetaenterpriseModelDB с таблицами БД 

### Запуск регламентных заданий

### Проверка захваченных объектов



## Applieds objects - Типы прикладных дааных

### Master data

### Operations

## Предопределенная структура БД

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


