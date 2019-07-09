
# DB設計

## members table

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Asociation
- belongs_to :group
- belongs_to :user


## users table

|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false|
|email|string|null: false, unique: true|

### Asociation
- has_many :messages, through: message_lists
- has_many :members
- has_many :groups, through: members


## messages table

|Column|Type|Option|
|------|----|------|
|body|text|null: false|
|image|string||

### Asociation
- belongs_to :user through: message_list
- belongs_to :group through: member
- belogns_to :member through: user


## message_lists

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Asociation
- belongs_to :user
- belongs_to :message


## groups table

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true, index: true|

### Asociation
- has_many :users through: members
- has_many :messages through: message_lists





