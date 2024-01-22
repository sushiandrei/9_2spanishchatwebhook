
from json import dumps
#allows you to store JSON data directly into a file
from httplib2 import Http
#a comprehensive HTTP client library that handles caching, keep-alive, compression, redirects and many kinds of authentication

while True:

  def main(): #defines the main function
      """Google Chat incoming webhook quickstart."""
      url = "https://chat.googleapis.com/v1/spaces/AAAA-M9tWic/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=ogt9MD99FGOVi8eWM8hgs7aHD_HSoc2xlGoUgC-GX08"
      #the url of the webhook
      app_message = {"text": input("Message: ")} #defines what message the user wants sent
      message_headers = {"Content-Type": "application/json; charset=UTF-8"}
      http_obj = Http()
      response = http_obj.request(
          uri=url,
          method="POST",
          headers=message_headers,
          body=dumps(app_message),
      )
  
  if __name__ == "__main__":
      main()
  # [END hangouts_python_webhook]
