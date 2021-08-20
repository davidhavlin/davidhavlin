<template>
	<div class="info-sign">
		<div class="bar">
			<div class="exit"><span>x</span></div>
		</div>
		<p>Čo ovládam?</p>

		<button>ok</button>
	</div>
</template>

<style lang="scss" scoped>
$sign-color: #03e271;

.info-sign {
	position: absolute;
	top: -99px;
	left: -83px;
	width: 130px;
	height: 100px;
	background: #34b3f6;
	color: #390779;
	font-style: normal;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-weight: normal;
	padding: 0.2rem;
	line-height: 13px;
	border-radius: 2px;
	text-align: center;
	cursor: default;
	opacity: 0;
	animation: move 0.8s forwards ease;
	animation-delay: 3s;
	transform: translateY(-50%);

	.bar {
		width: 100%;
		height: 15px;
		background: #5903e2;
		display: flex;
		justify-content: flex-end;
		padding: 0.1rem;

		.exit {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 100%;
			color: #5903e1;
			background: #34b2f5;
			cursor: pointer;

			span {
				display: block;
				position: absolute;
				font-weight: 700;
				height: 18px;
			}
		}
	}
	p {
		margin: 16px 0;
		font-size: 15px;
		font-weight: 600;
	}
	button {
		cursor: pointer;
		margin-bottom: 0.5rem;
		color: #57c5ff;
		background: #5903e1;
		padding: 0.1rem 0.7rem;
		border: 1px solid #390779;
		font-size: 12px;
		font-weight: 600;
		text-transform: uppercase;
	}
}
.info-sign::after {
	content: ' ';
	position: absolute;
	top: 99%;
	left: 75%;
	margin-left: -12px;
	border-width: 7px;
	border-style: solid;
	border-color: #34b3f6 transparent transparent transparent;
}

@keyframes move {
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
