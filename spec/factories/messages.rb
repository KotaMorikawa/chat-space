FactoryBot.define do
    factory :message do
        body {Faker::Lorem.sentence}
        image {File.open("#{Rails.root}/public/800*800.jpeg")}
        user
        group
    end
end