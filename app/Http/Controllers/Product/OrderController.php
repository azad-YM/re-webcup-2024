<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class OrderController extends Controller {
  public function index() {
    return Inertia::render("product/order", [
    ]);
  }
}