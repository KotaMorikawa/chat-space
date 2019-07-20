class Api::MessagesController < ApplicationController

    def index
        @group = Group.find(params[:group_id])
        if (params[:id] == nil)
            @messages = @group.messages.includes(:user)
        else
            @messages = @group.messages.includes(:user).where('id > ?', params[:id])
        end
    end

end