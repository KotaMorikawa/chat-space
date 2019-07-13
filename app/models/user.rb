class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :groups, through: :group_users
  has_many :group_user
  has_many :messages

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
