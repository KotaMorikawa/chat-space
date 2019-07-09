
# DB設計

## members table

|Column|Type|Option|
|------|----|------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Asociation
- belongs_to :group
- belongs_to :user


## users table

|Column|Type|Option|
|------|----|------|
|name|string|index: true, null: false|
|email|string|null: false, unique: true|

### Asociation
- has_many :messages
- has_many :members
- has_many :groups, through: :members


## messages table

|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Asociation
- belongs_to :user
- belongs_to :group 


## groups table

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true, index: true|

### Asociation
- has_many :users through: :members
- has_many :members
- has_many :messages





