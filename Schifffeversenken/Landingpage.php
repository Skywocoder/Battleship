<!DOCTYPE html>
<html>
<head>
	<title>Battleship Game</title>
	<style>
		body {
			background-color: #003366;
			font-family: Arial, sans-serif;
			color: #fff;
			text-align: center;
		}
		.container {
			margin-top: 5%;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		h1 {
			font-size: 4rem;
			margin-bottom: 0;
		}
		h2 {
			font-size: 2rem;
			margin-top: 0.5rem;
		}
		.play-btn {
			display: block;
			background-color: #ff6600;
			color: #fff;
			font-size: 1.2rem;
			font-weight: bold;
			padding: 1rem 2rem;
			border-radius: 30px;
			margin-top: 2rem;
			transition: background-color 0.3s ease-in-out;
			text-decoration: none;
		}
		.play-btn:hover {
			background-color: #cc6600;
		}
		img {
			margin-top: 3rem;
			max-width: 50%;
		}
	</style>
</head>
<body>
	<div class="container">
		<h1>Battleship</h1>
		<h2>The classic game of naval warfare</h2>
		<a href="#" class="play-btn">Play now</a>
		<img src="battleship.png" alt="Battleship game screenshot">
	</div>
</body>
</html>