function restrictStub(ctx){
    ctx.restrictChatMember(ctx.chat.id, ctx.from.id).then(member => {
        console.log(member);
    });
}