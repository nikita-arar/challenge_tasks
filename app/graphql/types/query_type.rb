# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :projects, [ProjectType], null: false
    field :tasks, [TaskType], null: false do
      argument :project_id, ID, required: true
    end

    def projects
      Project.all
    end

    def tasks(project_id:)
      Project.find(project_id).tasks
    end
  end
end
