$.get("../assets/items.json",populate);



var total = {}


function populate(response) {
  for (let item in response) {
    var card = (`<div class="card"></div>`)
    $("#display").append(card);
    $(".card:last").append(`<img src="http://place-hold.it/200 class="card-img-top"/>`);
    $(".card:last").append(`<h4 class="card-title">${response[item].product}</h4>`);
    $(".card:last").append(`<p class="card-text">$${response[item].price.toFixed(2)}</p>`);
    $(".card:last").append(`<input type="button" class="btn btn-success" id="add${item}" value="Buy">`);
    $(`#add${item}`).on('click',unshelve);
  }
}

function unshelve() {
  let id = this.id.substring(3);
  let subtotal = Number($("#total").text().substring(1));
  $.get("../assets/items.json",function (response) {
    if (total[id] === undefined) {
      total[id] = {
        "product": response[id].product,
        "price": response[id].price,
        "count": 1
      }
      $("#receit").append(`<li id="list${id}">${1}x ${response[id].product}...$${response[id].price.toFixed(2)} </li>`);
      $(`#list${id}`).append(`<button class='btn btn-sm btn-danger'>X</button>`);
      $(`#list${id} button`).on('click',shelve);
      subtotal+=Number(response[id].price);
      $("#total").text(`$${subtotal.toFixed(2)}`);
    } else {
      total[id].count+=1;
      $(`#list${id}`).html(
        `${total[id].count}x ${response[id].product}...$${response[id].price.toFixed(2)}
        <button class='btn btn-sm btn-danger'>X</button>`);
      $(`#list${id} button`).on('click',shelve);
      subtotal+=Number(response[id].price);
      $("#total").text(`$${subtotal.toFixed(2)}`);
    }
  })
}
function shelve() {
  let id = $(this).closest('li').attr("id").substring(4);
  let subtotal = Number($("#total").text().substring(1));
  $.get("../assets/items.json",function (response) {
    if (total[id].count == 1) {
      delete total[id];
      $(`#list${id}`).remove();
      subtotal-=Number(response[id].price);
      $("#total").text(`$${subtotal.toFixed(2)}`);
    } else {
      total[id].count-=1;
      $(`#list${id}`).html(
        `${total[id].count}x ${response[id].product}...$${response[id].price.toFixed(2)}
        <button class='btn btn-sm btn-danger'>X</button>`);
      $(`#list${id} button`).on('click',shelve);
      subtotal-=Number(response[id].price);
      $("#total").text(`$${subtotal.toFixed(2)}`);
    }
  })
}
