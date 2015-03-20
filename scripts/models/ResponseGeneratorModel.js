// _________________________________________________________________________ PaneModel
main.models.ResponseGeneratorModel = Backbone.Model.extend({
	 // set vars
     defaults: {
         "questions": [
			"How can I increase my social media presence?",
			"What's more effective, advertising online or on television?",
			"Are Facebook ads effective at targeting consumers?",
			"What are some simple web marketing techniques?",
			"How do I use web analytics to my advantage?",
			"Tell us one of your company’s biggest challenges?"
		 ],
         "answers": [
			"Increase your social media presence by deleting all of your social media. Less is more these days.",
			"Dunk an intern in a pool of yellow paint and have him or her run around town screaming your company's name.",
			"Eat a bag of peyote and marinate on that thought a little more. We're sure you'll come up with something.",
			"Well, lets see…you could always film a squirrel performing some sort of human activity. People always go for that.",
			"One word: Tom Selleck's Mustache  (Okay, that's three words.)",
			"Think of branding your company the same way celebrities name their babies. Choose your favorite color, animal and plant, combine them into one word and Voilà! You've got a multi-million dollar enterprise.",
			"I'm sorry I didn't understand that question. Were you asking how to market socket appliances, or rocket scientists?",
			"Of course we can help you with all of your SEO needs, but first we'll need you to take a blood oath that you'll never leave our company for another.",
			"When I was just a young website my father, the Internet, told me I could grow up to be whatever I wanted. Now look at me, I'm answering questions from you. Talk about a let down.",
			"What would make you think we'd know that? Google it, pal.",
			"Ok, here's what you do. You make a drop on the corner of Broward and 3rd Ave. Once we verify that the money is in the bag, you can then have your answer back.",
			"Product placement in films and television is a great way to have your company stand out. It's only going to cost you a couple million dollars. No biggie.",
			"Hire an up and coming rapper to pitch your product to his fans. These guys know a lot about selling product for a premium price.",
			"Stick your underwear on your head and do a rain dance. Hey, it worked for Mark Zuckerberg.",
			"Marketing is kind of like dancing. The more you drink the better you get at it. Did that answer your question?",
			"Wow, that's a great question. You're too smart for us. Sorry we can't work with you.",
			"I know! We'll make bumper stickers. Who doesn't love a great, big sticker stuck to your care that is impossible to remove?!",
			"Ask Anthony Weiner to handle your social media.",
			"Try a Crystal Pepsi. Mmmmm. 1990's Deliciousness.",
			"Tell your 11-year-old cousin to handle your company's social media. Those kids know everything about the interwebs.",
			"Increase company morale by having a local dance instructor teach everyone how to twerk. Both fun and awkward.",
			'To gain new clients, ask employees to stand on the side of road with a sandwich sign that says, "I need someone new in my life. Apply within."',
			"Hmmmmm...I'm not sure. You should probably hire Justin Timberlake for that. Everything he touches is gold.",
			"Our Aunt Mildred usually fixes that by adding whiskey...to everything.",
			"Put your right foot in. Put your right foot out.  Put your right foot in and you shake it all about it. You do the hokey pokey and your turn yourself around. That's what it's all about.",
			"Wear thick brimmed glasses without lenses, you hipster, you.",
			"Put your big kid pants on and deal with it.",
			"Cool story, bro. Maybe you should talk to some about it.",
			"Oh. It's on the tip of our tongue! … Nope. Got nothin'.",
			"Have you tried shaking the Magic Eight Ball to get the answer you want?",
			"Your mom. (Yup. We went there.)",
			"Go to Target. Target has ALL the answers. And shoes. And cute kids' clothes. And holiday candy. And fishing poles. And...",
			"You have the same amount of hours in a day as Beyonce. You can figure it out.",
			"Mom used to use vinegar and baking soda to get that out.  Try it.",
			"Did you see the Tigers game yesterday? I know that doesn't answer your question. But it was an AWESOME game.",
			"C++ is just an extra special average grade on a test. Right?",
			"Tell HR and management you've organized a team-building event. Once you're there, show them the sumo suits and yell, &#34;GO!&#34;",
			"Sounds like an issue with efficiency. Are you currently awake?",
			"I don't know. Who are you? What are you doing here? Mom. MOM!",
			"To get to the other side.",
			"We should talk about this over drinks. I picked up the tab last time. Your turn!",
			"In our experience, we've found that ignoring the problem until it implodes is the best solution. Cool?"
		],
		"current_question": "",
		"current_answer": ""
     },
     // ----------------- initialize
     initialize: function(){
         console.log("ResponseGeneratorModel ---- initialize");
     }
});