class UsersController < ApplicationController

    def index
        # binding.pry
        @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: current_user.id)
        respond_to do |format|
            format.json 
            format.html
        end
    end

    def edit
    end

    def update
        if current_user.update(user_params)
            redirect_to root_path
        else render :edit
        end
    end

    # def search
    #     binding.pry
    #     @users = User.where('name LIKE(?)', "%#{params[:keyword]}%")
    #     respond_to do |format|
    #         format.json {render 'index', json: @users}
    #         format.html
    #     end
    # end


    private
    def user_params
        params.require(:user).permit(:name, :email)
    end
end
