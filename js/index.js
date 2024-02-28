(function ($) {
    let currentAddress = null;
	$('#convertBtn').click(async () => {
        // Clear previous values
        $('#wallet-data').hide();
        $('#encryptedJson').val('');
        $('#address').val('');
        $('#mnemonic').val('');
        $('#privateKey').val('');
		const phrase = $('#walletPhrase').val();

        // Load wallet
		var wallet = ethers.Wallet.fromMnemonic(phrase);
		currentAddress = wallet.address;

        // Show new values
        $('#address').val(wallet.address);
        $('#mnemonic').val(wallet.mnemonic.phrase);
        $('#privateKey').val(wallet.privateKey);
        $('#wallet-data').show();
        
        // Encrypt last since it takes time
		const password = $('#walletPassword').val();
        const json = await wallet.encrypt(password);
        if (currentAddress == wallet.address) {
            $('#encryptedJson').val(json);
        }
	});

    $('.copy-btn').click(async function () {
        const val = $(this).closest('.input-group').find('input').val();
        await navigator.clipboard.writeText(val);
    });

    $('#downloadBtn').click(() => {
        const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent($('#encryptedJson').val())}`;
        const anchor = document.createElement('a');
        anchor.setAttribute('href', dataStr);
        anchor.setAttribute('download', `${$('#address').val()}.json`);
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
    });
})(jQuery);