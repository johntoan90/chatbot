
// Khai báo
var request = require("request");
var login = require("facebook-chat-api");
var SimsimiAnswered;
var text;
var botkey = "http://www.simsimi.com/getRealtimeReq?uuid=UwmPMKoqosEETKleXWGOJ6lynN1TQq18wwvrmCy6IRt&lc=vn&ft=0&reqText=";
login(
	{	
	email: "soundofwitch@gmail.com", 
	password: "pass" 
	},
function callback (err, api)
{
	if(err) return console.error(err);
	
	api.setOptions({forceLogin: true, selfListen: false, logLevel: "silent"});
	
	api.listen(function callback(err, message)
	{
		if(message.body === "stopchat") { 
			api.sendMessage(";) Ngừng auto chat thành công.", message.threadID); 
			api.markAsRead(message.threadID);
			return api.logout(err);
		}
		if (message.body==="Getid"||message.body==="getid"||message.body==="get id"||message.body==="Get id") {
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("Your ID: ", message.threadID); 
			api.sendMessage(message.senderID, message.threadID); 
			api.markAsRead(message.threadID); 
			console.log("Sender ID: " + message.senderID);
		}
		else if(message.body === "HD") { 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("mời click: https://facebook.com/thichanpoca", message.threadID); 
			api.sendMessage("Tin nhắn trả lời tự động. HD:  \n- Trả lời fb để ghé thăm tường của tôi. \n- Trả lời sdt để lấy số điện thoại của tôi. \n- Trả lời kèm stop ở đầu câu để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện.", message.threadID);
			return;
		}
		else if(message.body === "sdt") { 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			api.sendMessage("SĐT: 0961011180", message.threadID); 
			api.sendMessage("Tin nhắn trả lời tự động. HD:  \n- Trả lời fb để ghé thăm tường của tôi. \n- Trả lời sdt để lấy số điện thoại của tôi. \n- Trả lời kèm stop ở đầu câu để tránh chatbot tự động trả lời. \n- Trả lời bất kỳ để tiếp tục cuộc trò chuyện.", message.threadID);
			return;
		}
		 else if (message.senderID==="id_loại_trừ_1"||message.senderID==="id_loại_trừ_2") {			 
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			return;
		}else if (message.body)
		{
			console.log("FormID: " + message.threadID + '->Message: '+message.body);
			request(botkey + encodeURI(message.body),  
			function(error, response, body)
			{  
				if (error) api.sendMessage("Tao đang đơ, không trả lời được :)", message.threadID);
				if (body.indexOf("502 Bad Gateway") > 0 || body.indexOf("respSentence") < 0)
					api.sendMessage("Cái ji đây ?? :D ??: " + message.body, message.threadID 
				);
				text = JSON.parse(body);
				if (text.status == "200")
				{
					SimsimiAnswered = text.respSentence;
					if (message.body===text.respSentence) {
						return;
					} else
					SimsimiAnswered = text.respSentence;
					api.sendMessage(SimsimiAnswered+"\n--------------\n-Tin nhắn được gửi tự động bởi Hùng :))", message.threadID);
					api.markAsRead(message.threadID);
					console.log("Answered:"+SimsimiAnswered);
				}
			});
		}
	});
})