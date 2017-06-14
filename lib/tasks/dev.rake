# encoding: utf-8
namespace :dev do
  desc "Rebuild"
  task :build => [ "tmp:clear", "log:clear" ]

  desc "Test "
  task :test => :environment do
    user = User.new(email: 'phyala2@mailnesia.com', password: 'password')
    user.regist_email
  end
end
