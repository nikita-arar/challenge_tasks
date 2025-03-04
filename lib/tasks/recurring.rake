namespace :recurring do
  desc "Generate new tasks"
  task generate_new_tasks: :environment do
    Project.find_each do |project|
      Task.create!(name: "New Task #{Time.current.strftime('%H:%M:%S')}", project: project)
    end
  end
end
