class Group < ApplicationRecord
    has_many :users, through: :group_users
    has_many :group_users
    has_many :messages
    validates :name, presence: true, uniqueness: true

    def show_last_message
        if (last_messages = messages.last).present?
            last_messages.body? ? last_messages.body : '画像が投稿されています'
        else
            'まだメッセージはありません'
        end
    end
end
