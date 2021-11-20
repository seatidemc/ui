<template>
	<div congress>
		<h1 title><v-icon>mdi-vote</v-icon>模组决议</h1>
		<p>
			「模组决议」是 SEATiDE
			民主周目制的核心部分，在这里你可以查看最近可进行的决议事项。决议包含两类：<strong>模组征集</strong>和<strong>模组投票</strong>，如需了解基本概念、使用方式以及注意事项相关事宜，可以<a
				target="_blank"
				href="https://w.seatide.top/server/congress"
				>前往 Wiki 页面查看</a
			>。
		</p>
		<p>如果当前有可用的模组征集或模组投票，将显示在下面的区域中。</p>
		<h2>模组征集</h2>
		<div class="event-box">
			<span v-if="false" class="empty">暂无进行中的模组征集</span>

			<div class="event">
				<h1>二周目模组征集</h1>
				<span
					>发布于 2021-11-20 18:41 / 至 2021-11-20 18:41 结束</span
				>
			</div>
		</div>
		<h2>模组投票</h2>
		<div class="event-box empty">
			<span class="empty">暂无进行中的模组投票</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
.event-box {
	width: 100%;
	min-height: 100px;
	display: flex;
	align-items: center;
	&.empty {
		border: 1px dashed rgba(0, 0, 0, 0.21);
		border-radius: 5px;
		padding: 16px;
	}

	.empty {
		color: rgba(0, 0, 0, 0.21);
		display: block;
		margin: auto;
	}

	.event {
		width: 33.33%;
		border-radius: 5px;
		border: 1px solid rgba(0, 0, 0, 0.21);
		padding: 16px;
        cursor: pointer;
        transition: all .2s ease;
        &:hover {
            border-color: @primary;
            box-shadow: 0 1px 5px rgba(#000, .1);
        }
		h1 {
			font-size: 24px;
			line-height: 1;
			padding: 0;
            padding-bottom: 8px;
		}
		p {
			font-size: 14px;
		}
		span {
			font-size: 12px;
			.mdi {
				font-size: 12px;
			}
		}
	}
}
</style>