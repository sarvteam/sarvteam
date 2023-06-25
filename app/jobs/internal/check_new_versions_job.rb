class Internal::CheckNewVersionsJob < ApplicationJob
  queue_as :scheduled_jobs

  def perform
    return unless Rails.env.production?

    latest_version = SarvTeamHub.latest_version
    return unless latest_version

    ::Redis::Alfred.set(::Redis::Alfred::LATEST_SARVTEAM_VERSION, latest_version)
  end
end
