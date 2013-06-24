require 'sinatra'

get '/' do 
	'Hello World!'
	erb :front
end

get '/chat' do
	erb :index
end
